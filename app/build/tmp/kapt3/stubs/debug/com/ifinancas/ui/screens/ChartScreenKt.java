package com.ifinancas.ui.screens;

import android.util.Log;
import androidx.compose.material.ExperimentalMaterialApi;
import androidx.compose.runtime.Composable;
import androidx.compose.ui.Modifier;
import androidx.navigation.NavHostController;
import com.ifinancas.data.dataclass.Register;
import com.ifinancas.ui.viewModel.DateTimeViewModel;
import com.ifinancas.ui.viewModel.FinancialOperationsViewModel;
import com.ifinancas.ui.viewModel.UserViewModel;
import com.ifinancas.utils.AppUtils;
import java.util.Date;

@kotlin.Metadata(mv = {1, 9, 0}, k = 2, xi = 48, d1 = {"\u00002\n\u0000\n\u0002\u0010\u0002\n\u0000\n\u0002\u0018\u0002\n\u0000\n\u0002\u0018\u0002\n\u0000\n\u0002\u0010\u000e\n\u0000\n\u0002\u0018\u0002\n\u0000\n\u0002\u0010\u0006\n\u0002\b\u0002\n\u0002\u0010 \n\u0002\u0018\u0002\n\u0000\u001a*\u0010\u0000\u001a\u00020\u00012\u0006\u0010\u0002\u001a\u00020\u00032\u0006\u0010\u0004\u001a\u00020\u00052\b\u0010\u0006\u001a\u0004\u0018\u00010\u00072\u0006\u0010\b\u001a\u00020\tH\u0007\u001a\u001c\u0010\n\u001a\u00020\u000b2\u0006\u0010\f\u001a\u00020\u00072\f\u0010\r\u001a\b\u0012\u0004\u0012\u00020\u000f0\u000e\u00a8\u0006\u0010"}, d2 = {"ChartScreen", "", "pv", "Landroidx/compose/foundation/layout/PaddingValues;", "financialOperationsViewModel", "Lcom/ifinancas/ui/viewModel/FinancialOperationsViewModel;", "tag", "", "nav", "Landroidx/navigation/NavHostController;", "getTotalPerItem", "", "categoryValue", "sortRegistersList", "", "Lcom/ifinancas/data/dataclass/Register;", "app_debug"})
public final class ChartScreenKt {
    
    @kotlin.OptIn(markerClass = {androidx.compose.material.ExperimentalMaterialApi.class})
    @androidx.compose.runtime.Composable
    public static final void ChartScreen(@org.jetbrains.annotations.NotNull
    androidx.compose.foundation.layout.PaddingValues pv, @org.jetbrains.annotations.NotNull
    com.ifinancas.ui.viewModel.FinancialOperationsViewModel financialOperationsViewModel, @org.jetbrains.annotations.Nullable
    java.lang.String tag, @org.jetbrains.annotations.NotNull
    androidx.navigation.NavHostController nav) {
    }
    
    public static final double getTotalPerItem(@org.jetbrains.annotations.NotNull
    java.lang.String categoryValue, @org.jetbrains.annotations.NotNull
    java.util.List<com.ifinancas.data.dataclass.Register> sortRegistersList) {
        return 0.0;
    }
}