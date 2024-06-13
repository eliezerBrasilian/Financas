package com.ifinancas.services

import android.util.Log

class Print(val TAG: String = "App") {
    fun log(title:Any?, message: Any? = null){
        if(message == null){
            Log.e(TAG, title.toString())
        }else{
            Log.e(TAG,"$title : $message")
        }
    }
}