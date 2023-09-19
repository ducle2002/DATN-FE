package com.yootek.ioc.codescannermodule;

import android.graphics.Bitmap;
import android.graphics.Rect;
import android.os.Build;
import android.os.Environment;
import android.os.Handler;
import android.util.Log;
import android.view.PixelCopy;
import android.view.View;
import android.widget.Toast;

import androidx.annotation.NonNull;


import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class CodeScannerModule extends ReactContextBaseJavaModule {

    @NonNull
    @Override
    public String getName() {
        return "CodeScannerModule";
    }

    @ReactMethod
    public void startCameraPreview () {
        CodeScanner mCodeScanner = CodeScannerFragment.mCodeScanner;
        mCodeScanner.startPreview();
    }

    @ReactMethod
    public void capturePreview () {
        CodeScannerView scannerView = CodeScannerFragment.mScannerView;


        Date date = Calendar.getInstance().getTime();
        DateFormat dateFormat = new SimpleDateFormat("yyyy-mm-ddhh:mm:ss");
        String strDate = dateFormat.format(date);

        try {
            String mPath = Environment.getExternalStorageDirectory().toString() + "/" + "hello" + ".jpg";
            View view = scannerView.getRootView();

            Bitmap bitmap = Bitmap.createBitmap(scannerView.getWidth(), scannerView.getHeight(), Bitmap.Config.ARGB_8888);

            int[] locations = new int[2];
            view.getLocationInWindow(locations);
            Rect rect = new Rect(locations[0], locations[1], locations[0]+ scannerView.getWidth(), locations[1] + scannerView.getHeight());

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                PixelCopy.request(CodeScannerFragment.mScannerWindow, rect, bitmap, copyResult -> {
                    if(copyResult == PixelCopy.SUCCESS){

                        String destination = String.valueOf(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS));

                        FileOutputStream outputStream = null;
                        File dir = new File(destination + "/IOC");
                        dir.mkdir();


                        String fileName = System.currentTimeMillis() + ".jpg";
                        File imageFile = new File(dir, fileName);


                        try {
                            outputStream = new FileOutputStream(imageFile);
                            int quality = 100;
                            bitmap.compress(Bitmap.CompressFormat.JPEG, quality, outputStream);
                            outputStream.flush();
                            outputStream.close();
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    }
                }, new Handler());
            }
        }
        catch (Exception exception){
            exception.printStackTrace();
        }
    }
}
