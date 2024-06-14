package com.ifinancas.ui.viewModel

import androidx.lifecycle.ViewModel
import com.ifinancas.services.InterstitialAdsService
import dagger.hilt.android.lifecycle.HiltViewModel
import javax.inject.Inject

@HiltViewModel
class InterstitialAdsViewModel @Inject constructor(private val interstitialAdsService: InterstitialAdsService) :
    ViewModel() {
    fun loadAd() {
        interstitialAdsService.loadAd()
    }

    fun show() {
        interstitialAdsService.show()
    }

    fun stopAdd() {
        interstitialAdsService.removeListener()
    }
}