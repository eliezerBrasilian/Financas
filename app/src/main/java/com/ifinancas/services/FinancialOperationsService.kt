package com.ifinancas.services

import com.ifinancas.data.dataclass.Register

interface FinancialOperationsService {
    suspend fun getRevenues(userUid: String, monthName: String): Double
    suspend fun getReservations(userUid: String, monthName: String): Double
    suspend fun getExpenses(userUid: String, monthName: String): Double
    suspend fun loadRegistersFromDateDescendly(
        dayMonthAndYear: String,
        userUid: String
    ): List<Register>

    suspend fun loadRegistersFromDateDescendly(
        dayMonthAndYear: String,
        userUid: String,
        tag: String
    ): List<Register>

    suspend fun saveRegister(
        registerData: HashMap<String, Any>,
        onSuccess: () -> Unit,
        onFailure: () -> Unit = {}
    ): Boolean

    suspend fun deleteRegister(
        id: String,
        onSuccessDelete: () -> Unit,
        onFailureDelete: () -> Unit = {}
    )
}