package com.ifinancas.ui.screens.register

import android.util.Log
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.livedata.observeAsState
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.focus.FocusRequester
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalFocusManager
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavHostController
import androidx.navigation.compose.rememberNavController
import com.google.firebase.firestore.FieldValue
import com.ifinancas.data.enums.Category
import com.ifinancas.data.enums.Dia
import com.ifinancas.navigation.CustomTopBar
import com.ifinancas.ui.components.RegisterScreenOverlayView
import com.ifinancas.ui.components.RegisterValueInput
import com.ifinancas.ui.viewModel.DateTimeViewModel
import com.ifinancas.ui.viewModel.FinancialOperationsViewModel
import com.ifinancas.ui.viewModel.UserViewModel
import com.ifinancas.utils.AppUtils.Companion.AppTag
import com.ifinancas.utils.AppUtils.Companion.getBackgroundColor
import com.ifinancas.utils.AppUtils.Companion.getTitleText
import com.ifinancas.utils.Toast
import com.ifinancas.utils.showInterstitial
import kotlinx.coroutines.launch
import java.util.Date

@Composable
fun RegisterScreen(
    nav: NavHostController = rememberNavController(),
    tag: String? = "receita",
    pv: PaddingValues = PaddingValues(0.dp),
    financialOperationsViewModel: FinancialOperationsViewModel,
) {

    val userViewModel: UserViewModel = hiltViewModel()
    val dateTimeService: DateTimeViewModel = hiltViewModel()

    val uid by userViewModel.uid.observeAsState(initial = "")

    val focusRequester by remember { mutableStateOf(FocusRequester()) }
    val focusManager = LocalFocusManager.current
    var isFocused by remember { mutableStateOf(false) }
    var valueInput by remember { mutableStateOf("") }
    var daySelected by remember { mutableStateOf(Dia.TODAY) }
    var localDateTime by remember {
        mutableStateOf(Date())
    }
    var categorySelected by remember { mutableStateOf(Category.OUTROS) }
    var categoryExpanded by remember { mutableStateOf(false) }

    var buttonIsLoading by remember { mutableStateOf(false) }

    var descriptionInput by remember { mutableStateOf("") }
    val MAX_CHARACTER = 80

    val clearInputFocus = {
        focusManager.clearFocus()
    }

    val onValueChange: (value: String) -> Unit = {
        valueInput = it.filter { char -> char.isDigit() }
    }

    val onDescriptionChange: (value: String) -> Unit = {
        if (it.length <= MAX_CHARACTER) descriptionInput = it
    }

    val onFocusChange: (focused: Boolean) -> Unit = {
        isFocused = it
    }

    val handleSelectDayChange: (day: Dia) -> Unit = { day ->
        daySelected = day
        clearInputFocus()

        if (day == Dia.TODAY) {
            localDateTime = Date()
        }
        if (day == Dia.YESTERDAY) {
            localDateTime = dateTimeService.getYesterday()
        }
    }

    val handleCategoryChange: (category: Category) -> Unit = {
        categorySelected = it
        clearInputFocus()
        categoryExpanded = false
    }

    val toogleCategoryExpanded = {
        categoryExpanded = !categoryExpanded
    }

    val scope = rememberCoroutineScope()
    val context = LocalContext.current

    var savedSuccessfully by remember {
        mutableStateOf(false)
    }

    val clearInputs = {
        valueInput = ""
        descriptionInput = ""
        daySelected = Dia.TODAY
        localDateTime = Date()
        categorySelected = Category.OUTROS
    }

    val successOnRegister = {
        println("Sucesso")
        Toast(context).showToast("Registrado com sucesso")
        savedSuccessfully = true
        clearInputs()
    }

    val handleSendRegister: () -> Unit = {
        showInterstitial(context)
        buttonIsLoading = true

        var v = 0.00
        if (valueInput.isNotEmpty()) {
            v = valueInput.toDouble() / 100
        }

        Log.d(AppTag, "valor: " + v)

        val registerData = hashMapOf(
            "tag" to tag.toString(),
            "category" to categorySelected.value,
            "deleted" to false,
            "amount" to v,
            "description" to descriptionInput.trim(),
            "descriptionInLowerCaseForSearching" to descriptionInput.trim().lowercase(),
            "monthYear" to dateTimeService.getMonthAndYear(localDateTime),
            "dayMonthYear" to dateTimeService.getDateFormatted(localDateTime),
            "createdAt" to FieldValue.serverTimestamp(),
            "createdBy" to uid.toString()
        )

        scope.launch {
            val saved = financialOperationsViewModel.saveRegister(registerData).await()
            if (saved) {
                successOnRegister()
            }
        }

        buttonIsLoading = false
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(getBackgroundColor(tag.toString()))
            .padding(pv)
    ) {
        Column(modifier = Modifier.padding(10.dp)) {
            CustomTopBar(color = Color.White, text = getTitleText(tag.toString()), nav = nav)
            Column(
                modifier = Modifier.fillMaxWidth(),
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                RegisterValueInput(
                    valueInput, onValueChange, tag, isFocused, onFocusChange, focusRequester
                )
            }
        }
        Column {
            Spacer(modifier = Modifier.height(10.dp))
            RegisterScreenOverlayView(
                daySelected,
                handleSelectDayChange,
                categorySelected,
                handleCategoryChange,
                categoryExpanded,
                toogleCategoryExpanded,
                tag,
                buttonIsLoading,
                descriptionInput,
                onDescriptionChange,
                handleSendRegister,
                savedSuccessfully
            )

        }
    }
}


