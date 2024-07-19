package com.ifinancas.utils;

import android.app.Activity;
import android.content.Context;
import android.content.ContextWrapper;
import com.google.android.gms.ads.AdError;
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.FullScreenContentCallback;
import com.google.android.gms.ads.LoadAdError;
import com.google.android.gms.ads.interstitial.InterstitialAd;
import com.google.android.gms.ads.interstitial.InterstitialAdLoadCallback;

@kotlin.Metadata(mv = {1, 9, 0}, k = 2, xi = 48, d1 = {"\u0000$\n\u0000\n\u0002\u0018\u0002\n\u0002\b\u0005\n\u0002\u0010\u0002\n\u0000\n\u0002\u0018\u0002\n\u0002\b\u0003\n\u0002\u0018\u0002\n\u0000\n\u0002\u0018\u0002\n\u0000\u001a\u000e\u0010\u0006\u001a\u00020\u00072\u0006\u0010\b\u001a\u00020\t\u001a\u0006\u0010\n\u001a\u00020\u0007\u001a\u001e\u0010\u000b\u001a\u00020\u00072\u0006\u0010\b\u001a\u00020\t2\u000e\b\u0002\u0010\f\u001a\b\u0012\u0004\u0012\u00020\u00070\r\u001a\f\u0010\u000e\u001a\u0004\u0018\u00010\u000f*\u00020\t\"\u001c\u0010\u0000\u001a\u0004\u0018\u00010\u0001X\u0086\u000e\u00a2\u0006\u000e\n\u0000\u001a\u0004\b\u0002\u0010\u0003\"\u0004\b\u0004\u0010\u0005\u00a8\u0006\u0010"}, d2 = {"mInterstitialAd", "Lcom/google/android/gms/ads/interstitial/InterstitialAd;", "getMInterstitialAd", "()Lcom/google/android/gms/ads/interstitial/InterstitialAd;", "setMInterstitialAd", "(Lcom/google/android/gms/ads/interstitial/InterstitialAd;)V", "loadInterstitial", "", "context", "Landroid/content/Context;", "removeInterstitial", "showInterstitial", "onAdDismissed", "Lkotlin/Function0;", "findActivity", "Landroid/app/Activity;", "app_release"})
public final class InterstitialAdsKt {
    @org.jetbrains.annotations.Nullable
    private static com.google.android.gms.ads.interstitial.InterstitialAd mInterstitialAd;
    
    @org.jetbrains.annotations.Nullable
    public static final com.google.android.gms.ads.interstitial.InterstitialAd getMInterstitialAd() {
        return null;
    }
    
    public static final void setMInterstitialAd(@org.jetbrains.annotations.Nullable
    com.google.android.gms.ads.interstitial.InterstitialAd p0) {
    }
    
    public static final void loadInterstitial(@org.jetbrains.annotations.NotNull
    android.content.Context context) {
    }
    
    public static final void showInterstitial(@org.jetbrains.annotations.NotNull
    android.content.Context context, @org.jetbrains.annotations.NotNull
    kotlin.jvm.functions.Function0<kotlin.Unit> onAdDismissed) {
    }
    
    public static final void removeInterstitial() {
    }
    
    @org.jetbrains.annotations.Nullable
    public static final android.app.Activity findActivity(@org.jetbrains.annotations.NotNull
    android.content.Context $this$findActivity) {
        return null;
    }
}