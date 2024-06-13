package com.ifinancas.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.ifinancas.data.enums.Dia

@Preview
@Composable
fun DayChooser(
    daySelected: Dia = Dia.TODAY,
    handleSelectDayChange: (day: Dia) -> Unit = {},
) {
    Row(
        modifier = Modifier
            .background(Color(0xfff7f3ff), RoundedCornerShape(10.dp))
            .padding(15.dp),
        horizontalArrangement = Arrangement.spacedBy(15.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        DayChooserItem(Dia.TODAY, daySelected, handleSelectDayChange)
        DayChooserItem(Dia.YESTERDAY, daySelected, handleSelectDayChange)
    }
}