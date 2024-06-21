package com.ifinancas.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.selection.TextSelectionColors
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Text
import androidx.compose.material3.TextField
import androidx.compose.material3.TextFieldDefaults
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.ifinancas.data.enums.Category
import com.ifinancas.data.enums.Dia
import com.ifinancas.ui.theme.OVERVIEW
import com.ifinancas.utils.AppUtils

@Composable
fun RegisterScreenOverlayView(
    daySelected: Dia,
    handleSelectDayChange: (day: Dia) -> Unit,
    categorySelected: Category,
    handleCategoryChange: (category: Category) -> Unit,
    categoryExpanded: Boolean,
    toogleCategoryExpanded: () -> Unit,
    tag: String?,
    buttonIsLoading: Boolean,
    descriptionInput: String,
    onDescriptionChange: (value: String) -> Unit,
    handleSendRegister: () -> Unit,
    savedSuccessfully: Boolean,

    ) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(OVERVIEW, RoundedCornerShape(topStart = 12.dp, topEnd = 12.dp))
            .padding(10.dp)
    ) {
        LightView {
            DayChooser(daySelected, handleSelectDayChange)
        }
        Spacer(modifier = Modifier.height(10.dp))
        LightView {
            CategoryChooser(
                categorySelected,
                handleCategoryChange,
                categoryExpanded,
                toogleCategoryExpanded
            )
        }
        Spacer(modifier = Modifier.height(10.dp))
        TextField(
            value = descriptionInput, onValueChange = onDescriptionChange, singleLine = true,
            placeholder = {
                Text(
                    text = "descrição da $tag...",
                    color = Color.Gray,
                    fontSize = 12.sp
                )
            },
            textStyle = TextStyle(color = Color.Black, fontSize = 13.sp),
            colors = TextFieldDefaults.colors(
                focusedContainerColor = Color.Transparent,
                unfocusedContainerColor = Color.Transparent,
                focusedIndicatorColor = AppUtils.getBackgroundColor(tag.toString()),
                selectionColors = TextSelectionColors(
                    handleColor = AppUtils.getBackgroundColor(tag.toString()),
                    backgroundColor = Color.Transparent
                )
            ),
            modifier = Modifier.fillMaxWidth()
        )
        Spacer(modifier = Modifier.height(35.dp))
        Button(
            onClick = handleSendRegister,
            colors = ButtonDefaults.buttonColors(AppUtils.getBackgroundColor(tag.toString())),
            modifier = Modifier.fillMaxWidth(),
            contentPadding = PaddingValues(vertical = 12.dp)
        ) {
            Text(
                text = "Salvar",
                fontSize = 13.sp,
                fontWeight = FontWeight.Bold,
                color = Color.White
            )
        }

        Spacer(modifier = Modifier.height(35.dp))
        if (savedSuccessfully) {
            Text(
                text = "Sua $tag foi registrada com sucesso 😊",
                fontWeight = FontWeight.Bold,
                color = Color.Blue,
                fontSize = 15.sp,
                modifier = Modifier.fillMaxWidth(),
                textAlign = TextAlign.Center
            )
        }

    }
}