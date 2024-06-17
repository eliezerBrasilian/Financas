package com.ifinancas.ui.components

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.ifinancas.ui.viewModel.DateTimeViewModel
import compose.icons.FontAwesomeIcons
import compose.icons.fontawesomeicons.Solid
import compose.icons.fontawesomeicons.solid.CaretLeft
import compose.icons.fontawesomeicons.solid.CaretRight
import java.util.Date

@Composable
fun MonthView(
    decrementMonth: () -> Unit,
    dateTimeViewModel: DateTimeViewModel,
    currentDate: Date,
    incrementMonth: () -> Unit
) {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .padding(15.dp), contentAlignment = Alignment.TopCenter
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(10.dp), horizontalArrangement = Arrangement.Center,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Icon(
                imageVector = FontAwesomeIcons.Solid.CaretLeft,
                modifier = Modifier
                    .size(20.dp)
                    .clickable { decrementMonth() },
                contentDescription = null
            )
            Text(
                text = dateTimeViewModel.getMonthName(currentDate),
                fontSize = 16.sp,
                color = Color.Black,
                fontWeight = FontWeight.Bold,
            )
            Icon(
                imageVector = FontAwesomeIcons.Solid.CaretRight,
                modifier = Modifier
                    .size(20.dp)
                    .clickable { incrementMonth() },
                contentDescription = null
            )
        }
    }
}