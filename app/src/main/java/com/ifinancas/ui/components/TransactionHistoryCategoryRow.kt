package com.ifinancas.ui.components

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Row
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
import com.ifinancas.data.dataclass.Register
import compose.icons.FontAwesomeIcons
import compose.icons.fontawesomeicons.Solid
import compose.icons.fontawesomeicons.solid.Home

@Composable
fun TransactionHistoryCategoryRow(register: Register) {
    Row(
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(3.dp)
    ) {
        Icon(
            imageVector = FontAwesomeIcons.Solid.Home, contentDescription = null,
            tint = Color.Black, modifier = Modifier.size(10.dp)
        )
        Text(
            text = register.category,
            fontSize = 9.sp,
            color = Color.Black,
            fontWeight = FontWeight.Normal,
        )
    }
}