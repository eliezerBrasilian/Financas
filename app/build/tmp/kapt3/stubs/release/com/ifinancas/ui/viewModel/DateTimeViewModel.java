package com.ifinancas.ui.viewModel;

import androidx.lifecycle.ViewModel;
import com.google.firebase.Timestamp;
import com.ifinancas.services.DateTimeService;
import dagger.hilt.android.lifecycle.HiltViewModel;
import java.util.Date;
import javax.inject.Inject;

@kotlin.Metadata(mv = {1, 9, 0}, k = 1, xi = 48, d1 = {"\u00000\n\u0002\u0018\u0002\n\u0002\u0018\u0002\n\u0000\n\u0002\u0018\u0002\n\u0002\b\u0002\n\u0002\u0018\u0002\n\u0002\b\u0002\n\u0002\u0010\u000e\n\u0000\n\u0002\u0018\u0002\n\u0002\b\u0005\n\u0002\u0010 \n\u0002\b\u0003\b\u0007\u0018\u00002\u00020\u0001B\u000f\b\u0007\u0012\u0006\u0010\u0002\u001a\u00020\u0003\u00a2\u0006\u0002\u0010\u0004J\u000e\u0010\u0005\u001a\u00020\u00062\u0006\u0010\u0007\u001a\u00020\u0006J\u000e\u0010\b\u001a\u00020\t2\u0006\u0010\n\u001a\u00020\u000bJ\u0010\u0010\f\u001a\u00020\t2\b\b\u0002\u0010\r\u001a\u00020\u0006J\u0010\u0010\u000e\u001a\u00020\t2\b\b\u0002\u0010\r\u001a\u00020\u0006J\u0010\u0010\u000f\u001a\u00020\t2\b\b\u0002\u0010\r\u001a\u00020\u0006J\f\u0010\u0010\u001a\b\u0012\u0004\u0012\u00020\t0\u0011J\u0006\u0010\u0012\u001a\u00020\u0006J\u000e\u0010\u0013\u001a\u00020\u00062\u0006\u0010\u0007\u001a\u00020\u0006R\u000e\u0010\u0002\u001a\u00020\u0003X\u0082\u0004\u00a2\u0006\u0002\n\u0000\u00a8\u0006\u0014"}, d2 = {"Lcom/ifinancas/ui/viewModel/DateTimeViewModel;", "Landroidx/lifecycle/ViewModel;", "dateTimeService", "Lcom/ifinancas/services/DateTimeService;", "(Lcom/ifinancas/services/DateTimeService;)V", "decrementMonth", "Ljava/util/Date;", "currentDate", "formatTimestamp", "", "timestamp", "Lcom/google/firebase/Timestamp;", "getDateFormatted", "date", "getMonthAndYear", "getMonthName", "getMonths", "", "getYesterday", "incrementMonth", "app_release"})
@dagger.hilt.android.lifecycle.HiltViewModel
public final class DateTimeViewModel extends androidx.lifecycle.ViewModel {
    @org.jetbrains.annotations.NotNull
    private final com.ifinancas.services.DateTimeService dateTimeService = null;
    
    @javax.inject.Inject
    public DateTimeViewModel(@org.jetbrains.annotations.NotNull
    com.ifinancas.services.DateTimeService dateTimeService) {
        super();
    }
    
    @org.jetbrains.annotations.NotNull
    public final java.lang.String getMonthName(@org.jetbrains.annotations.NotNull
    java.util.Date date) {
        return null;
    }
    
    @org.jetbrains.annotations.NotNull
    public final java.util.Date getYesterday() {
        return null;
    }
    
    @org.jetbrains.annotations.NotNull
    public final java.lang.String getMonthAndYear(@org.jetbrains.annotations.NotNull
    java.util.Date date) {
        return null;
    }
    
    @org.jetbrains.annotations.NotNull
    public final java.lang.String getDateFormatted(@org.jetbrains.annotations.NotNull
    java.util.Date date) {
        return null;
    }
    
    @org.jetbrains.annotations.NotNull
    public final java.util.List<java.lang.String> getMonths() {
        return null;
    }
    
    @org.jetbrains.annotations.NotNull
    public final java.lang.String formatTimestamp(@org.jetbrains.annotations.NotNull
    com.google.firebase.Timestamp timestamp) {
        return null;
    }
    
    @org.jetbrains.annotations.NotNull
    public final java.util.Date decrementMonth(@org.jetbrains.annotations.NotNull
    java.util.Date currentDate) {
        return null;
    }
    
    @org.jetbrains.annotations.NotNull
    public final java.util.Date incrementMonth(@org.jetbrains.annotations.NotNull
    java.util.Date currentDate) {
        return null;
    }
}