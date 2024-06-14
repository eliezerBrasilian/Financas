package com.ifinancas.ui.viewModel

import android.util.Log
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.ifinancas.data.dataclass.Register
import com.ifinancas.data.enums.FinancialOperation
import com.ifinancas.services.FinancialOperationsService
import com.ifinancas.utils.AppUtils.Companion.AppTag
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.Deferred
import kotlinx.coroutines.async
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class FinancialOperationsViewModel @Inject constructor(
    private val financialOperationsService: FinancialOperationsService
) :
    ViewModel() {
    private val _loadedState = MutableStateFlow(true)
    val loadedState: StateFlow<Boolean> = _loadedState

    private val _totalInBalance = MutableStateFlow(0.00)
    val totalInBalance: StateFlow<Double> = _totalInBalance

    private val _totalInRevenues = MutableStateFlow(0.00)
    val totalInRevenues: StateFlow<Double> = _totalInRevenues

    private val _totalInReservations = MutableStateFlow(0.00)
    val totalInReservations: StateFlow<Double> = _totalInReservations

    private val _totalInExpenses = MutableStateFlow(0.00)
    val totalInExpense: StateFlow<Double> = _totalInExpenses

    private val _performingFinancialOperation = MutableStateFlow(FinancialOperation.IDLE)
    val performingFinancialOperation: StateFlow<FinancialOperation> = _performingFinancialOperation


    fun getTotalBalance(userUid: String, givenMonthYear: String) = viewModelScope.launch {
        val receitas = financialOperationsService.getRevenues(userUid, givenMonthYear)
        val reservas = financialOperationsService.getReservations(userUid, givenMonthYear)
        val despesas = financialOperationsService.getExpenses(userUid, givenMonthYear)

        val total = receitas - (reservas + despesas)
        Log.d(AppTag, "total: $total")

        _totalInBalance.value = total
        _totalInRevenues.value = receitas
        _totalInReservations.value = reservas
        _totalInExpenses.value = despesas

        stopLoadBalance()
    }

    fun loadRegistersFromDateDescendly(
        dayMonthAndYear: String,
        userUid: String
    ): Deferred<List<Register>> = viewModelScope.async {
        val lista =
            financialOperationsService.loadRegistersFromDateDescendly(dayMonthAndYear, userUid)
        return@async lista
    }

    fun loadRegistersFromDateDescendly(
        dayMonthAndYear: String,
        userUid: String,
        tag: String
    ): Deferred<List<Register>> = viewModelScope.async {
        val lista =
            financialOperationsService.loadRegistersFromDateDescendly(dayMonthAndYear, userUid, tag)
        return@async lista
    }

    fun saveRegister(registerData: HashMap<String, Any>): Deferred<Boolean> = viewModelScope.async {
        canLoadBalance()
        return@async financialOperationsService.saveRegister(registerData)
    }

    fun deleteRegister(id: String, onSuccessDelete: () -> Unit, onFailureDelete: () -> Unit = {}) =
        viewModelScope.launch {
            _performingFinancialOperation.value = FinancialOperation.DELETING
            financialOperationsService.deleteRegister(id, onSuccessDelete = {
                _performingFinancialOperation.value = FinancialOperation.IDLE
                canLoadBalance()
                onSuccessDelete()
            }, onFailureDelete = onFailureDelete)
        }

    fun resetBalance() {
        _totalInBalance.value = 0.0
        _totalInRevenues.value = 0.0
        _totalInReservations.value = 0.0
        _totalInExpenses.value = 0.0

        canLoadBalance()
    }

    fun canLoadBalance() {
        _loadedState.value = true
    }

    private fun stopLoadBalance() {
        _loadedState.value = false
    }


}