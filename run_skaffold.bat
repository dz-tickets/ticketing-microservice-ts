@echo off
setlocal enabledelayedexpansion

:: Load environment variables from .env file if it exists
if exist .env (
    echo Loading environment variables from .env file...
    for /f "tokens=*" %%a in (.env) do (
        set "%%a"
    )
)

:: Main script entry point
call :main %*
exit /b %ERRORLEVEL%

:main
    :: Process arguments
    set "ENV_TYPE=%~1"
    if "%ENV_TYPE%"=="" set "ENV_TYPE=local"

    :: Shift first argument if provided
    if not "%~1"=="" shift

    :: Collect all remaining arguments
    set "ADDITIONAL_ARGS="
    :arg_loop
    if not "%~1"=="" (
        if defined ADDITIONAL_ARGS (
            set "ADDITIONAL_ARGS=!ADDITIONAL_ARGS! %~1"
        ) else (
            set "ADDITIONAL_ARGS=%~1"
        )
        shift
        goto arg_loop
    )

    echo Environment Type: %ENV_TYPE%
    if defined ADDITIONAL_ARGS echo Additional Arguments: %ADDITIONAL_ARGS%

    call :run_skaffold "%ENV_TYPE%" "%ADDITIONAL_ARGS%"
    exit /b %ERRORLEVEL%

:run_skaffold
    set "environment=%~1"
    set "args=%~2"
    set "repository="

    :: Determine repository based on environment
    if /i "%environment%"=="local" (
        echo Starting skaffold in LOCAL environment...
        set "repository=%LOCAL_DEFAULT_REPO%"
    ) else if /i "%environment%"=="gcb" (
        echo Starting skaffold in GCB environment...
        set "repository=%GOOGLE_CLOUD_DEFAULT_REPO%"
    ) else (
        echo Invalid environment type: %environment%
        echo Valid options are: local, gcb
        exit /b 1
    )

    :: Validate repository setting
    if not defined repository (
        echo Error: Repository is not defined for %environment% environment
        exit /b 1
    )
    if "%repository%"=="" (
        echo Error: Repository is empty for %environment% environment
        exit /b 1
    )

    echo Using repository: %repository%

    :: Build and execute skaffold command
    set "skaffold_cmd=skaffold dev -p %environment% --default-repo=%repository%"
    if defined args set "skaffold_cmd=%skaffold_cmd% %args%"

    echo Executing: %skaffold_cmd%
    %skaffold_cmd%
    exit /b %ERRORLEVEL%