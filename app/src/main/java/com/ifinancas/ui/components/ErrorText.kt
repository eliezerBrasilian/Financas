package com.ifinancas.ui.components

import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.sp

@Preview
@Composable
fun ErrorText(text:String = ""){
    Text(
        text = text,
        color = Color.Red,
        fontWeight = FontWeight.Medium,
        fontSize = 12.sp,
        modifier = Modifier.fillMaxWidth()
    )
}