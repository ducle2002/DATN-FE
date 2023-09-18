package com.yootek.ioc;

import android.app.Activity;

import androidx.annotation.NonNull;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.yootek.ioc.codescannermodule.ScannerViewManager;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class MyPackage  implements ReactPackage {
    private Activity nActivity = null;

    @NonNull
    @Override
    public List<NativeModule> createNativeModules(@NonNull ReactApplicationContext reactApplicationContext) {
        List<NativeModule> modules = new ArrayList<>();
        return modules;
    }

    @NonNull
    @Override
    public List<ViewManager> createViewManagers(@NonNull ReactApplicationContext reactApplicationContext) {
        return Arrays.<ViewManager>asList(
                new ScannerViewManager(reactApplicationContext)
        );
    }
}
