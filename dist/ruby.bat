 @echo off
 REM use UTF8
 chcp 65001 > NUL

 SET "NODE_JS_RUNTIME_PATH=C:\"Program Files"\nodejs\node.exe"
 SET "RVM_ROOT_PATH=C:\Users\Sicco\AppData\Roaming\npm\node_modules\rvm-windows"

 call %NODE_JS_RUNTIME_PATH% "index.js" "%CD%" %~n0 %*
