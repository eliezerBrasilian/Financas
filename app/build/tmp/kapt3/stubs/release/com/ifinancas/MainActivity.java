package com.ifinancas;

import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import androidx.activity.ComponentActivity;
import androidx.annotation.RequiresApi;
import androidx.navigation.NavHostController;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.firebase.messaging.FirebaseMessaging;
import com.ifinancas.ui.viewModel.AuthViewModel;
import com.ifinancas.ui.viewModel.FinancialOperationsViewModel;
import com.ifinancas.ui.viewModel.PopUpHomeViewModel;
import com.ifinancas.ui.viewModel.PopUpOfertaViewModel;
import com.ifinancas.ui.viewModel.UserViewModel;
import dagger.hilt.android.AndroidEntryPoint;

@dagger.hilt.android.AndroidEntryPoint
@kotlin.Metadata(mv = {1, 9, 0}, k = 1, xi = 48, d1 = {"\u00002\n\u0002\u0018\u0002\n\u0002\u0018\u0002\n\u0002\b\u0002\n\u0002\u0018\u0002\n\u0002\b\u0005\n\u0002\u0018\u0002\n\u0002\b\u0004\n\u0002\u0018\u0002\n\u0002\b\u0004\n\u0002\u0010\u0002\n\u0000\n\u0002\u0018\u0002\n\u0002\b\u0002\b\u0007\u0018\u00002\u00020\u0001B\u0005\u00a2\u0006\u0002\u0010\u0002J\u0012\u0010\u0013\u001a\u00020\u00142\b\u0010\u0015\u001a\u0004\u0018\u00010\u0016H\u0015J\b\u0010\u0017\u001a\u00020\u0014H\u0014R\u001b\u0010\u0003\u001a\u00020\u00048BX\u0082\u0084\u0002\u00a2\u0006\f\n\u0004\b\u0007\u0010\b\u001a\u0004\b\u0005\u0010\u0006R\u001b\u0010\t\u001a\u00020\n8BX\u0082\u0084\u0002\u00a2\u0006\f\n\u0004\b\r\u0010\b\u001a\u0004\b\u000b\u0010\fR\u001b\u0010\u000e\u001a\u00020\u000f8BX\u0082\u0084\u0002\u00a2\u0006\f\n\u0004\b\u0012\u0010\b\u001a\u0004\b\u0010\u0010\u0011\u00a8\u0006\u0018"}, d2 = {"Lcom/ifinancas/MainActivity;", "Landroidx/activity/ComponentActivity;", "()V", "authViewModel", "Lcom/ifinancas/ui/viewModel/AuthViewModel;", "getAuthViewModel", "()Lcom/ifinancas/ui/viewModel/AuthViewModel;", "authViewModel$delegate", "Lkotlin/Lazy;", "financialOperationsViewModel", "Lcom/ifinancas/ui/viewModel/FinancialOperationsViewModel;", "getFinancialOperationsViewModel", "()Lcom/ifinancas/ui/viewModel/FinancialOperationsViewModel;", "financialOperationsViewModel$delegate", "userViewModel", "Lcom/ifinancas/ui/viewModel/UserViewModel;", "getUserViewModel", "()Lcom/ifinancas/ui/viewModel/UserViewModel;", "userViewModel$delegate", "onCreate", "", "savedInstanceState", "Landroid/os/Bundle;", "onDestroy", "app_release"})
public final class MainActivity extends androidx.activity.ComponentActivity {
    @org.jetbrains.annotations.NotNull
    private final kotlin.Lazy authViewModel$delegate = null;
    @org.jetbrains.annotations.NotNull
    private final kotlin.Lazy financialOperationsViewModel$delegate = null;
    @org.jetbrains.annotations.NotNull
    private final kotlin.Lazy userViewModel$delegate = null;
    
    public MainActivity() {
        super(0);
    }
    
    private final com.ifinancas.ui.viewModel.AuthViewModel getAuthViewModel() {
        return null;
    }
    
    private final com.ifinancas.ui.viewModel.FinancialOperationsViewModel getFinancialOperationsViewModel() {
        return null;
    }
    
    private final com.ifinancas.ui.viewModel.UserViewModel getUserViewModel() {
        return null;
    }
    
    @java.lang.Override
    @androidx.annotation.RequiresApi(value = android.os.Build.VERSION_CODES.O)
    protected void onCreate(@org.jetbrains.annotations.Nullable
    android.os.Bundle savedInstanceState) {
    }
    
    @java.lang.Override
    protected void onDestroy() {
    }
}