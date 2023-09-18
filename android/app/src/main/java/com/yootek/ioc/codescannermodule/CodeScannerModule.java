package com.yootek.ioc.codescannermodule;

import androidx.annotation.NonNull;

import com.budiyev.android.codescanner.CodeScanner;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

public class CodeScannerModule extends ReactContextBaseJavaModule {

    private CodeScanner codeScanner = null;

    public void setCodeScanner(CodeScanner codeScanner) {
        this.codeScanner = codeScanner;
    }

    @NonNull
    @Override
    public String getName() {
        return "CodeScannerModule";
    }
}
