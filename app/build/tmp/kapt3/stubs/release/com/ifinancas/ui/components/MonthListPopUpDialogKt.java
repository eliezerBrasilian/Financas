package com.ifinancas.ui.components;

import android.annotation.SuppressLint;
import android.view.animation.OvershootInterpolator;
import androidx.compose.foundation.layout.Arrangement;
import androidx.compose.material3.CardDefaults;
import androidx.compose.runtime.Composable;
import androidx.compose.ui.Alignment;
import androidx.compose.ui.Modifier;
import androidx.compose.ui.text.style.TextAlign;
import androidx.compose.ui.tooling.preview.Preview;
import com.ifinancas.services.DateTimeService;
import com.ifinancas.ui.viewModel.DateTimeViewModel;

@kotlin.Metadata(mv = {1, 9, 0}, k = 2, xi = 48, d1 = {"\u0000(\n\u0000\n\u0002\u0010\u0002\n\u0000\n\u0002\u0018\u0002\n\u0000\n\u0002\u0010\u000e\n\u0000\n\u0002\u0018\u0002\n\u0002\u0018\u0002\n\u0002\b\u0003\n\u0002\u0010\u000b\n\u0002\b\u0003\u001aQ\u0010\u0000\u001a\u00020\u00012\u000e\b\u0002\u0010\u0002\u001a\b\u0012\u0004\u0012\u00020\u00010\u00032\b\b\u0002\u0010\u0004\u001a\u00020\u00052#\b\u0002\u0010\u0006\u001a\u001d\u0012\u0013\u0012\u00110\u0005\u00a2\u0006\f\b\b\u0012\b\b\t\u0012\u0004\b\b(\n\u0012\u0004\u0012\u00020\u00010\u00072\b\b\u0002\u0010\u000b\u001a\u00020\fH\u0007\u001aA\u0010\r\u001a\u00020\u00012\b\b\u0002\u0010\u000e\u001a\u00020\u00052\b\b\u0002\u0010\u0004\u001a\u00020\u00052#\b\u0002\u0010\u0006\u001a\u001d\u0012\u0013\u0012\u00110\u0005\u00a2\u0006\f\b\b\u0012\b\b\t\u0012\u0004\b\b(\n\u0012\u0004\u0012\u00020\u00010\u0007H\u0007\u00a8\u0006\u000f"}, d2 = {"MonthListPopUpDialog", "", "onDismissRequest", "Lkotlin/Function0;", "monthSelected", "", "onChangeMonthItem", "Lkotlin/Function1;", "Lkotlin/ParameterName;", "name", "month", "monthListVisible", "", "MonthListPopUpDialogItem", "text", "app_release"})
public final class MonthListPopUpDialogKt {
    
    @androidx.compose.ui.tooling.preview.Preview
    @android.annotation.SuppressLint(value = {"NewApi"})
    @androidx.compose.runtime.Composable
    public static final void MonthListPopUpDialog(@org.jetbrains.annotations.NotNull
    kotlin.jvm.functions.Function0<kotlin.Unit> onDismissRequest, @org.jetbrains.annotations.NotNull
    java.lang.String monthSelected, @org.jetbrains.annotations.NotNull
    kotlin.jvm.functions.Function1<? super java.lang.String, kotlin.Unit> onChangeMonthItem, boolean monthListVisible) {
    }
    
    @androidx.compose.ui.tooling.preview.Preview
    @androidx.compose.runtime.Composable
    public static final void MonthListPopUpDialogItem(@org.jetbrains.annotations.NotNull
    java.lang.String text, @org.jetbrains.annotations.NotNull
    java.lang.String monthSelected, @org.jetbrains.annotations.NotNull
    kotlin.jvm.functions.Function1<? super java.lang.String, kotlin.Unit> onChangeMonthItem) {
    }
}