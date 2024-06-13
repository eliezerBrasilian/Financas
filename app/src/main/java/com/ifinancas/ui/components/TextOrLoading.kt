package com.ifinancas.ui.components

import androidx.compose.foundation.layout.size
import androidx.compose.material.Text
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

@Composable
 fun TextOrLoading(isLoading: Boolean?, text:String) {
    if (isLoading == true) {
        CircularProgressIndicator(
            modifier = Modifier.size(30.dp),
            color = Color.White,
            trackColor = MaterialTheme.colorScheme.surfaceVariant,
            strokeWidth = 2.dp
        )
    } else {
        Text(
            text = text,
            color = Color.White,
            fontWeight = FontWeight.Medium,
            fontSize = 13.sp
        )
    }
}