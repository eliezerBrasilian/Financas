package com.ifinancas.ui.components

import androidx.compose.foundation.border
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.Button
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

@Composable
 fun AuthButton(isLoading: Boolean?,text:String,
                backgroundColor:Color = Color.Blue,
                onClick: () -> Unit) {
    Button(
        onClick = onClick,
        modifier = Modifier
            .fillMaxWidth()
            .height(50.dp)
            .border(width = 1.dp, color = backgroundColor, shape = RoundedCornerShape(9.dp))
    ) {
        TextOrLoading(isLoading = isLoading, text = text)
    }
}