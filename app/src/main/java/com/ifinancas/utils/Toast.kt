package com.ifinancas.utils

import android.content.Context
import android.widget.Toast

class Toast(private val context: Context) {
    fun showToast(title: String) {
        Toast.makeText(context, title, Toast.LENGTH_LONG).show()
    }
}