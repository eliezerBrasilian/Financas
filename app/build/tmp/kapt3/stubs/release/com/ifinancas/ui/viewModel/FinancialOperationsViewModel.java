package com.ifinancas.ui.viewModel;

import android.util.Log;
import androidx.lifecycle.ViewModel;
import com.ifinancas.data.dataclass.Register;
import com.ifinancas.data.enums.FinancialOperation;
import com.ifinancas.services.FinancialOperationsService;
import dagger.hilt.android.lifecycle.HiltViewModel;
import kotlinx.coroutines.Deferred;
import kotlinx.coroutines.flow.StateFlow;
import javax.inject.Inject;

@kotlin.Metadata(mv = {1, 9, 0}, k = 1, xi = 48, d1 = {"\u0000l\n\u0002\u0018\u0002\n\u0002\u0018\u0002\n\u0000\n\u0002\u0018\u0002\n\u0002\b\u0002\n\u0002\u0018\u0002\n\u0002\u0010\u000b\n\u0000\n\u0002\u0018\u0002\n\u0000\n\u0002\u0010\u0006\n\u0002\b\u0004\n\u0002\u0018\u0002\n\u0002\b\r\n\u0002\u0010\u0002\n\u0000\n\u0002\u0018\u0002\n\u0000\n\u0002\u0010\u000e\n\u0000\n\u0002\u0018\u0002\n\u0002\b\u0005\n\u0002\u0018\u0002\n\u0002\u0010 \n\u0002\u0018\u0002\n\u0002\b\u0005\n\u0002\u0018\u0002\n\u0002\u0010\u0000\n\u0002\u0018\u0002\n\u0002\b\u0002\b\u0007\u0018\u00002\u00020\u0001B\u000f\b\u0007\u0012\u0006\u0010\u0002\u001a\u00020\u0003\u00a2\u0006\u0002\u0010\u0004J\u0006\u0010\u001d\u001a\u00020\u001eJ,\u0010\u001f\u001a\u00020 2\u0006\u0010!\u001a\u00020\"2\f\u0010#\u001a\b\u0012\u0004\u0012\u00020\u001e0$2\u000e\b\u0002\u0010%\u001a\b\u0012\u0004\u0012\u00020\u001e0$J\u0016\u0010&\u001a\u00020 2\u0006\u0010\'\u001a\u00020\"2\u0006\u0010(\u001a\u00020\"J\"\u0010)\u001a\u000e\u0012\n\u0012\b\u0012\u0004\u0012\u00020,0+0*2\u0006\u0010-\u001a\u00020\"2\u0006\u0010\'\u001a\u00020\"J*\u0010)\u001a\u000e\u0012\n\u0012\b\u0012\u0004\u0012\u00020,0+0*2\u0006\u0010-\u001a\u00020\"2\u0006\u0010\'\u001a\u00020\"2\u0006\u0010.\u001a\u00020\"J\u0006\u0010/\u001a\u00020\u001eJ0\u00100\u001a\b\u0012\u0004\u0012\u00020\u00070*2\"\u00101\u001a\u001e\u0012\u0004\u0012\u00020\"\u0012\u0004\u0012\u00020302j\u000e\u0012\u0004\u0012\u00020\"\u0012\u0004\u0012\u000203`4J\b\u00105\u001a\u00020\u001eH\u0002R\u0014\u0010\u0005\u001a\b\u0012\u0004\u0012\u00020\u00070\u0006X\u0082\u0004\u00a2\u0006\u0002\n\u0000R\u0014\u0010\b\u001a\b\u0012\u0004\u0012\u00020\t0\u0006X\u0082\u0004\u00a2\u0006\u0002\n\u0000R\u0014\u0010\n\u001a\b\u0012\u0004\u0012\u00020\u000b0\u0006X\u0082\u0004\u00a2\u0006\u0002\n\u0000R\u0014\u0010\f\u001a\b\u0012\u0004\u0012\u00020\u000b0\u0006X\u0082\u0004\u00a2\u0006\u0002\n\u0000R\u0014\u0010\r\u001a\b\u0012\u0004\u0012\u00020\u000b0\u0006X\u0082\u0004\u00a2\u0006\u0002\n\u0000R\u0014\u0010\u000e\u001a\b\u0012\u0004\u0012\u00020\u000b0\u0006X\u0082\u0004\u00a2\u0006\u0002\n\u0000R\u000e\u0010\u0002\u001a\u00020\u0003X\u0082\u0004\u00a2\u0006\u0002\n\u0000R\u0017\u0010\u000f\u001a\b\u0012\u0004\u0012\u00020\u00070\u0010\u00a2\u0006\b\n\u0000\u001a\u0004\b\u0011\u0010\u0012R\u0017\u0010\u0013\u001a\b\u0012\u0004\u0012\u00020\t0\u0010\u00a2\u0006\b\n\u0000\u001a\u0004\b\u0014\u0010\u0012R\u0017\u0010\u0015\u001a\b\u0012\u0004\u0012\u00020\u000b0\u0010\u00a2\u0006\b\n\u0000\u001a\u0004\b\u0016\u0010\u0012R\u0017\u0010\u0017\u001a\b\u0012\u0004\u0012\u00020\u000b0\u0010\u00a2\u0006\b\n\u0000\u001a\u0004\b\u0018\u0010\u0012R\u0017\u0010\u0019\u001a\b\u0012\u0004\u0012\u00020\u000b0\u0010\u00a2\u0006\b\n\u0000\u001a\u0004\b\u001a\u0010\u0012R\u0017\u0010\u001b\u001a\b\u0012\u0004\u0012\u00020\u000b0\u0010\u00a2\u0006\b\n\u0000\u001a\u0004\b\u001c\u0010\u0012\u00a8\u00066"}, d2 = {"Lcom/ifinancas/ui/viewModel/FinancialOperationsViewModel;", "Landroidx/lifecycle/ViewModel;", "financialOperationsService", "Lcom/ifinancas/services/FinancialOperationsService;", "(Lcom/ifinancas/services/FinancialOperationsService;)V", "_loadedState", "Lkotlinx/coroutines/flow/MutableStateFlow;", "", "_performingFinancialOperation", "Lcom/ifinancas/data/enums/FinancialOperation;", "_totalInBalance", "", "_totalInExpenses", "_totalInReservations", "_totalInRevenues", "loadedState", "Lkotlinx/coroutines/flow/StateFlow;", "getLoadedState", "()Lkotlinx/coroutines/flow/StateFlow;", "performingFinancialOperation", "getPerformingFinancialOperation", "totalInBalance", "getTotalInBalance", "totalInExpense", "getTotalInExpense", "totalInReservations", "getTotalInReservations", "totalInRevenues", "getTotalInRevenues", "canLoadBalance", "", "deleteRegister", "Lkotlinx/coroutines/Job;", "id", "", "onSuccessDelete", "Lkotlin/Function0;", "onFailureDelete", "getTotalBalance", "userUid", "givenMonthYear", "loadRegistersFromDateDescendly", "Lkotlinx/coroutines/Deferred;", "", "Lcom/ifinancas/data/dataclass/Register;", "dayMonthAndYear", "tag", "resetBalance", "saveRegister", "registerData", "Ljava/util/HashMap;", "", "Lkotlin/collections/HashMap;", "stopLoadBalance", "app_release"})
@dagger.hilt.android.lifecycle.HiltViewModel
public final class FinancialOperationsViewModel extends androidx.lifecycle.ViewModel {
    @org.jetbrains.annotations.NotNull
    private final com.ifinancas.services.FinancialOperationsService financialOperationsService = null;
    @org.jetbrains.annotations.NotNull
    private final kotlinx.coroutines.flow.MutableStateFlow<java.lang.Boolean> _loadedState = null;
    @org.jetbrains.annotations.NotNull
    private final kotlinx.coroutines.flow.StateFlow<java.lang.Boolean> loadedState = null;
    @org.jetbrains.annotations.NotNull
    private final kotlinx.coroutines.flow.MutableStateFlow<java.lang.Double> _totalInBalance = null;
    @org.jetbrains.annotations.NotNull
    private final kotlinx.coroutines.flow.StateFlow<java.lang.Double> totalInBalance = null;
    @org.jetbrains.annotations.NotNull
    private final kotlinx.coroutines.flow.MutableStateFlow<java.lang.Double> _totalInRevenues = null;
    @org.jetbrains.annotations.NotNull
    private final kotlinx.coroutines.flow.StateFlow<java.lang.Double> totalInRevenues = null;
    @org.jetbrains.annotations.NotNull
    private final kotlinx.coroutines.flow.MutableStateFlow<java.lang.Double> _totalInReservations = null;
    @org.jetbrains.annotations.NotNull
    private final kotlinx.coroutines.flow.StateFlow<java.lang.Double> totalInReservations = null;
    @org.jetbrains.annotations.NotNull
    private final kotlinx.coroutines.flow.MutableStateFlow<java.lang.Double> _totalInExpenses = null;
    @org.jetbrains.annotations.NotNull
    private final kotlinx.coroutines.flow.StateFlow<java.lang.Double> totalInExpense = null;
    @org.jetbrains.annotations.NotNull
    private final kotlinx.coroutines.flow.MutableStateFlow<com.ifinancas.data.enums.FinancialOperation> _performingFinancialOperation = null;
    @org.jetbrains.annotations.NotNull
    private final kotlinx.coroutines.flow.StateFlow<com.ifinancas.data.enums.FinancialOperation> performingFinancialOperation = null;
    
    @javax.inject.Inject
    public FinancialOperationsViewModel(@org.jetbrains.annotations.NotNull
    com.ifinancas.services.FinancialOperationsService financialOperationsService) {
        super();
    }
    
    @org.jetbrains.annotations.NotNull
    public final kotlinx.coroutines.flow.StateFlow<java.lang.Boolean> getLoadedState() {
        return null;
    }
    
    @org.jetbrains.annotations.NotNull
    public final kotlinx.coroutines.flow.StateFlow<java.lang.Double> getTotalInBalance() {
        return null;
    }
    
    @org.jetbrains.annotations.NotNull
    public final kotlinx.coroutines.flow.StateFlow<java.lang.Double> getTotalInRevenues() {
        return null;
    }
    
    @org.jetbrains.annotations.NotNull
    public final kotlinx.coroutines.flow.StateFlow<java.lang.Double> getTotalInReservations() {
        return null;
    }
    
    @org.jetbrains.annotations.NotNull
    public final kotlinx.coroutines.flow.StateFlow<java.lang.Double> getTotalInExpense() {
        return null;
    }
    
    @org.jetbrains.annotations.NotNull
    public final kotlinx.coroutines.flow.StateFlow<com.ifinancas.data.enums.FinancialOperation> getPerformingFinancialOperation() {
        return null;
    }
    
    @org.jetbrains.annotations.NotNull
    public final kotlinx.coroutines.Job getTotalBalance(@org.jetbrains.annotations.NotNull
    java.lang.String userUid, @org.jetbrains.annotations.NotNull
    java.lang.String givenMonthYear) {
        return null;
    }
    
    @org.jetbrains.annotations.NotNull
    public final kotlinx.coroutines.Deferred<java.util.List<com.ifinancas.data.dataclass.Register>> loadRegistersFromDateDescendly(@org.jetbrains.annotations.NotNull
    java.lang.String dayMonthAndYear, @org.jetbrains.annotations.NotNull
    java.lang.String userUid) {
        return null;
    }
    
    @org.jetbrains.annotations.NotNull
    public final kotlinx.coroutines.Deferred<java.util.List<com.ifinancas.data.dataclass.Register>> loadRegistersFromDateDescendly(@org.jetbrains.annotations.NotNull
    java.lang.String dayMonthAndYear, @org.jetbrains.annotations.NotNull
    java.lang.String userUid, @org.jetbrains.annotations.NotNull
    java.lang.String tag) {
        return null;
    }
    
    @org.jetbrains.annotations.NotNull
    public final kotlinx.coroutines.Deferred<java.lang.Boolean> saveRegister(@org.jetbrains.annotations.NotNull
    java.util.HashMap<java.lang.String, java.lang.Object> registerData) {
        return null;
    }
    
    @org.jetbrains.annotations.NotNull
    public final kotlinx.coroutines.Job deleteRegister(@org.jetbrains.annotations.NotNull
    java.lang.String id, @org.jetbrains.annotations.NotNull
    kotlin.jvm.functions.Function0<kotlin.Unit> onSuccessDelete, @org.jetbrains.annotations.NotNull
    kotlin.jvm.functions.Function0<kotlin.Unit> onFailureDelete) {
        return null;
    }
    
    public final void resetBalance() {
    }
    
    public final void canLoadBalance() {
    }
    
    private final void stopLoadBalance() {
    }
}