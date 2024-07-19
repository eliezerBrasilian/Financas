package com.ifinancas.services.impl;

import android.app.Activity;
import android.content.Context;
import android.content.ContextWrapper;
import android.util.Log;
import com.google.android.gms.ads.AdError;
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.FullScreenContentCallback;
import com.google.android.gms.ads.LoadAdError;
import com.google.android.gms.ads.interstitial.InterstitialAd;
import com.google.android.gms.ads.interstitial.InterstitialAdLoadCallback;
import com.ifinancas.services.InterstitialAdsService;
import dagger.hilt.android.qualifiers.ApplicationContext;
import javax.inject.Inject;

@kotlin.Metadata(mv = {1, 9, 0}, k = 1, xi = 48, d1 = {"\u0000(\n\u0002\u0018\u0002\n\u0002\u0018\u0002\n\u0000\n\u0002\u0018\u0002\n\u0002\b\u0002\n\u0002\u0018\u0002\n\u0002\b\u0005\n\u0002\u0010\u0002\n\u0002\b\u0003\n\u0002\u0018\u0002\n\u0000\u0018\u00002\u00020\u0001B\u0011\b\u0007\u0012\b\b\u0001\u0010\u0002\u001a\u00020\u0003\u00a2\u0006\u0002\u0010\u0004J\b\u0010\u000b\u001a\u00020\fH\u0016J\b\u0010\r\u001a\u00020\fH\u0016J\b\u0010\u000e\u001a\u00020\fH\u0016J\u000e\u0010\u000f\u001a\u0004\u0018\u00010\u0010*\u00020\u0003H\u0002R\u000e\u0010\u0002\u001a\u00020\u0003X\u0082\u0004\u00a2\u0006\u0002\n\u0000R\u001c\u0010\u0005\u001a\u0004\u0018\u00010\u0006X\u0086\u000e\u00a2\u0006\u000e\n\u0000\u001a\u0004\b\u0007\u0010\b\"\u0004\b\t\u0010\n\u00a8\u0006\u0011"}, d2 = {"Lcom/ifinancas/services/impl/IntersititialAdsServiceImpl;", "Lcom/ifinancas/services/InterstitialAdsService;", "context", "Landroid/content/Context;", "(Landroid/content/Context;)V", "mInterstitialAd", "Lcom/google/android/gms/ads/interstitial/InterstitialAd;", "getMInterstitialAd", "()Lcom/google/android/gms/ads/interstitial/InterstitialAd;", "setMInterstitialAd", "(Lcom/google/android/gms/ads/interstitial/InterstitialAd;)V", "loadAd", "", "removeListener", "show", "findActivity", "Landroid/app/Activity;", "app_debug"})
public final class IntersititialAdsServiceImpl implements com.ifinancas.services.InterstitialAdsService {
    @org.jetbrains.annotations.NotNull
    private final android.content.Context context = null;
    @org.jetbrains.annotations.Nullable
    private com.google.android.gms.ads.interstitial.InterstitialAd mInterstitialAd;
    
    @javax.inject.Inject
    public IntersititialAdsServiceImpl(@dagger.hilt.android.qualifiers.ApplicationContext
    @org.jetbrains.annotations.NotNull
    android.content.Context context) {
        super();
    }
    
    @org.jetbrains.annotations.Nullable
    public final com.google.android.gms.ads.interstitial.InterstitialAd getMInterstitialAd() {
        return null;
    }
    
    public final void setMInterstitialAd(@org.jetbrains.annotations.Nullable
    com.google.android.gms.ads.interstitial.InterstitialAd p0) {
    }
    
    @java.lang.Override
    public void loadAd() {
    }
    
    @java.lang.Override
    public void show() {
    }
    
    @java.lang.Override
    public void removeListener() {
    }
    
    private final android.app.Activity findActivity(android.content.Context $this$findActivity) {
        return null;
    }
}