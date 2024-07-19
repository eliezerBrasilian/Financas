package com.ifinancas.ui.viewModel;

import android.net.Uri;
import android.os.Build;
import android.util.Log;
import androidx.annotation.RequiresApi;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.ktx.Firebase;
import com.ifinancas.data.dataclass.FirebaseUserResponse;
import com.ifinancas.data.dataclass.UserAuthSignUpData;
import com.ifinancas.services.AuthService;
import com.ifinancas.utils.AppUtils;
import dagger.hilt.android.lifecycle.HiltViewModel;
import javax.inject.Inject;

@kotlin.Metadata(mv = {1, 9, 0}, k = 1, xi = 48, d1 = {"\u0000`\n\u0002\u0018\u0002\n\u0002\u0018\u0002\n\u0000\n\u0002\u0018\u0002\n\u0002\b\u0002\n\u0002\u0018\u0002\n\u0002\u0010\u000b\n\u0002\b\u0002\n\u0002\u0018\u0002\n\u0000\n\u0002\u0018\u0002\n\u0002\b\u0003\n\u0002\u0018\u0002\n\u0000\n\u0002\u0010\u000e\n\u0002\b\u0003\n\u0002\u0018\u0002\n\u0002\u0018\u0002\n\u0002\u0018\u0002\n\u0000\n\u0002\u0010\u0002\n\u0002\b\u0004\n\u0002\u0018\u0002\n\u0002\b\u0002\n\u0002\u0018\u0002\n\u0002\b\u0003\b\u0007\u0018\u00002\u00020\u0001B\u000f\b\u0007\u0012\u0006\u0010\u0002\u001a\u00020\u0003\u00a2\u0006\u0002\u0010\u0004Jf\u0010\u000f\u001a\u00020\u00102\u0006\u0010\u0011\u001a\u00020\u00122\u0006\u0010\u0013\u001a\u00020\u00122\u0006\u0010\u0014\u001a\u00020\u00122!\u0010\u0015\u001a\u001d\u0012\u0013\u0012\u00110\u0017\u00a2\u0006\f\b\u0018\u0012\b\b\u0014\u0012\u0004\b\b(\u0019\u0012\u0004\u0012\u00020\u001a0\u00162!\u0010\u001b\u001a\u001d\u0012\u0013\u0012\u00110\u0012\u00a2\u0006\f\b\u0018\u0012\b\b\u0014\u0012\u0004\b\b(\u001c\u0012\u0004\u0012\u00020\u001a0\u0016H\u0007J\b\u0010\u001d\u001a\u0004\u0018\u00010\u0012J\\\u0010\u001e\u001a\u00020\u00102\u0006\u0010\u0011\u001a\u00020\u00122\u0006\u0010\u0013\u001a\u00020\u00122!\u0010\u0015\u001a\u001d\u0012\u0013\u0012\u00110\u001f\u00a2\u0006\f\b\u0018\u0012\b\b\u0014\u0012\u0004\b\b(\u0019\u0012\u0004\u0012\u00020\u001a0\u00162!\u0010\u001b\u001a\u001d\u0012\u0013\u0012\u00110\u0012\u00a2\u0006\f\b\u0018\u0012\b\b\u0014\u0012\u0004\b\b(\u001c\u0012\u0004\u0012\u00020\u001a0\u0016Jn\u0010 \u001a\u00020\u00102\u0006\u0010\u0011\u001a\u00020\u00122\u0006\u0010\u0014\u001a\u00020\u00122\b\u0010!\u001a\u0004\u0018\u00010\"2\u0006\u0010#\u001a\u00020\u00122!\u0010\u0015\u001a\u001d\u0012\u0013\u0012\u00110\u001f\u00a2\u0006\f\b\u0018\u0012\b\b\u0014\u0012\u0004\b\b(\u0019\u0012\u0004\u0012\u00020\u001a0\u00162!\u0010\u001b\u001a\u001d\u0012\u0013\u0012\u00110\u0012\u00a2\u0006\f\b\u0018\u0012\b\b\u0014\u0012\u0004\b\b(\u001c\u0012\u0004\u0012\u00020\u001a0\u0016J\u0006\u0010$\u001a\u00020\u001aR\u001c\u0010\u0005\u001a\u0010\u0012\f\u0012\n \b*\u0004\u0018\u00010\u00070\u00070\u0006X\u0082\u0004\u00a2\u0006\u0002\n\u0000R\u000e\u0010\t\u001a\u00020\nX\u0082\u000e\u00a2\u0006\u0002\n\u0000R\u000e\u0010\u0002\u001a\u00020\u0003X\u0082\u0004\u00a2\u0006\u0002\n\u0000R\u0017\u0010\u000b\u001a\b\u0012\u0004\u0012\u00020\u00070\f\u00a2\u0006\b\n\u0000\u001a\u0004\b\r\u0010\u000e\u00a8\u0006%"}, d2 = {"Lcom/ifinancas/ui/viewModel/AuthViewModel;", "Landroidx/lifecycle/ViewModel;", "authService", "Lcom/ifinancas/services/AuthService;", "(Lcom/ifinancas/services/AuthService;)V", "_loading", "Landroidx/lifecycle/MutableLiveData;", "", "kotlin.jvm.PlatformType", "auth", "Lcom/google/firebase/auth/FirebaseAuth;", "loading", "Landroidx/lifecycle/LiveData;", "getLoading", "()Landroidx/lifecycle/LiveData;", "createUserWithEmailAndPassword", "Lkotlinx/coroutines/Job;", "email", "", "password", "name", "onSuccess", "Lkotlin/Function1;", "Lcom/ifinancas/data/dataclass/UserAuthSignUpData;", "Lkotlin/ParameterName;", "user", "", "onError", "errorCode", "getUserUid", "login", "Lcom/ifinancas/data/dataclass/FirebaseUserResponse;", "loginWithGoogle", "photo", "Landroid/net/Uri;", "userUid", "signOut", "app_release"})
@dagger.hilt.android.lifecycle.HiltViewModel
public final class AuthViewModel extends androidx.lifecycle.ViewModel {
    @org.jetbrains.annotations.NotNull
    private final com.ifinancas.services.AuthService authService = null;
    @org.jetbrains.annotations.NotNull
    private com.google.firebase.auth.FirebaseAuth auth;
    @org.jetbrains.annotations.NotNull
    private final androidx.lifecycle.MutableLiveData<java.lang.Boolean> _loading = null;
    @org.jetbrains.annotations.NotNull
    private final androidx.lifecycle.LiveData<java.lang.Boolean> loading = null;
    
    @javax.inject.Inject
    public AuthViewModel(@org.jetbrains.annotations.NotNull
    com.ifinancas.services.AuthService authService) {
        super();
    }
    
    @org.jetbrains.annotations.NotNull
    public final androidx.lifecycle.LiveData<java.lang.Boolean> getLoading() {
        return null;
    }
    
    @org.jetbrains.annotations.NotNull
    public final kotlinx.coroutines.Job loginWithGoogle(@org.jetbrains.annotations.NotNull
    java.lang.String email, @org.jetbrains.annotations.NotNull
    java.lang.String name, @org.jetbrains.annotations.Nullable
    android.net.Uri photo, @org.jetbrains.annotations.NotNull
    java.lang.String userUid, @org.jetbrains.annotations.NotNull
    kotlin.jvm.functions.Function1<? super com.ifinancas.data.dataclass.FirebaseUserResponse, kotlin.Unit> onSuccess, @org.jetbrains.annotations.NotNull
    kotlin.jvm.functions.Function1<? super java.lang.String, kotlin.Unit> onError) {
        return null;
    }
    
    @org.jetbrains.annotations.NotNull
    public final kotlinx.coroutines.Job login(@org.jetbrains.annotations.NotNull
    java.lang.String email, @org.jetbrains.annotations.NotNull
    java.lang.String password, @org.jetbrains.annotations.NotNull
    kotlin.jvm.functions.Function1<? super com.ifinancas.data.dataclass.FirebaseUserResponse, kotlin.Unit> onSuccess, @org.jetbrains.annotations.NotNull
    kotlin.jvm.functions.Function1<? super java.lang.String, kotlin.Unit> onError) {
        return null;
    }
    
    @androidx.annotation.RequiresApi(value = android.os.Build.VERSION_CODES.O)
    @org.jetbrains.annotations.NotNull
    public final kotlinx.coroutines.Job createUserWithEmailAndPassword(@org.jetbrains.annotations.NotNull
    java.lang.String email, @org.jetbrains.annotations.NotNull
    java.lang.String password, @org.jetbrains.annotations.NotNull
    java.lang.String name, @org.jetbrains.annotations.NotNull
    kotlin.jvm.functions.Function1<? super com.ifinancas.data.dataclass.UserAuthSignUpData, kotlin.Unit> onSuccess, @org.jetbrains.annotations.NotNull
    kotlin.jvm.functions.Function1<? super java.lang.String, kotlin.Unit> onError) {
        return null;
    }
    
    @org.jetbrains.annotations.Nullable
    public final java.lang.String getUserUid() {
        return null;
    }
    
    public final void signOut() {
    }
}