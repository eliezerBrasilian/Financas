package com.ifinancas.ui.viewModel

import androidx.lifecycle.ViewModel
import com.google.firebase.Timestamp
import com.ifinancas.services.DateTimeService
import dagger.hilt.android.lifecycle.HiltViewModel
import java.util.Date
import javax.inject.Inject

@HiltViewModel
class DateTimeViewModel @Inject constructor(private val dateTimeService: DateTimeService) :
    ViewModel() {
    fun getMonthName(date: Date = Date()): String {
        return dateTimeService.getMonthName(date)
    }

    fun getYesterday(): Date {
        return dateTimeService.getYesterday()
    }

    fun getMonthAndYear(date: Date = Date()): String {
        return dateTimeService.getMonthAndYear(date)
    }

    fun getDateFormatted(date: Date = Date()): String {
        return dateTimeService.getDateFormatted(date)
    }

    fun getMonths(): List<String> {
        return dateTimeService.getMonths()
    }

    fun formatTimestamp(timestamp: Timestamp): String {
        return dateTimeService.formatTimestamp(timestamp)
    }

    fun decrementMonth(currentDate: Date): Date {
        val newDate = dateTimeService.decreaseMonth(currentDate)
        return newDate
    }

    fun incrementMonth(currentDate: Date): Date {
        val newDate = dateTimeService.increaseMonth(currentDate)
        return newDate
    }

}