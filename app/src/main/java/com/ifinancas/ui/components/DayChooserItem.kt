package com.ifinancas.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.ifinancas.data.enums.Dia

@Composable
fun DayChooserItem(
    day: Dia,
    daySelected: Dia = Dia.TODAY,
    handleSelectDayChange: (day: Dia) -> Unit = {}
) {
    Box(modifier = Modifier
        .background(
            if (daySelected == day) Color(0xff88527F) else Color(0xffb5cdd6),
            RoundedCornerShape(12.dp)
        )
        .padding(10.dp)
        .clickable {
            handleSelectDayChange(day)
        }) {
        Text(
            text = if (day == Dia.TODAY) "hoje" else "ontem",
            color = Color.White,
            fontSize = 13.sp
        )
    }
}