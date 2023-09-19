package com.yootek.ioc.codescannermodule;

import static com.facebook.react.bridge.UiThreadUtil.runOnUiThread;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.Camera;
import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;


import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.google.zxing.Result;
import com.yootek.ioc.R;
public class CodeScannerFragment extends Fragment {

    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER

    protected static CodeScanner mCodeScanner;

    protected static CodeScannerView mScannerView;

    protected static Window mScannerWindow;
    private ReactContext reactContext = null;

    public void setReactContext (ReactContext context){
        reactContext = context;
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        super.onCreateView(inflater, container, savedInstanceState);
        return inflater.inflate(R.layout.activity_camera, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        mScannerView = view.findViewById(R.id.scanner_view);
        mCodeScanner = new CodeScanner(view.getContext(), mScannerView);
        mCodeScanner.setCamera(CodeScanner.CAMERA_BACK);
        mCodeScanner.setFormats(CodeScanner.ALL_FORMATS);
        mScannerWindow = getActivity().getWindow();
        mCodeScanner.setDecodeCallback(new DecodeCallback() {
            @Override
            public void onDecoded(@NonNull Result result) {
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        Context context = mScannerView.getContext();
                        Log.d("TAG", "run: context "+ context.toString());
                        onReceiveNativeEvent(result.getText());
                    }
                });

            }
        });
        mScannerView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                mCodeScanner.startPreview();
            }
        });
    }

    public void onReceiveNativeEvent(String message) {
        WritableMap event = Arguments.createMap();
        event.putString("message", message);
        ReactContext context = reactContext;
        context
                .getJSModule(RCTEventEmitter.class)
                .receiveEvent(getId(), "topChange", event);
    }

    @Override
    public void onStart() {
        super.onStart();
    }

    @Override
    public void onResume() {
        Log.d("TAG", "onResume: resume");
        super.onResume();
        mCodeScanner.startPreview();
    }

    @Override
    public void onPause() {
        Log.d("TAG", "onPause: pause");
        mCodeScanner.releaseResources();
        super.onPause();
    }
    @Override
    public void onStop() {
        super.onStop();
        Log.d("TAG", "onStop");
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
    }
}