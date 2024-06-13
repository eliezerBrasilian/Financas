package com.ifinancas.services

import android.content.Context

interface InterstitialAdsService {
    fun loadAd()
    fun show()
    fun removeListener()
}

