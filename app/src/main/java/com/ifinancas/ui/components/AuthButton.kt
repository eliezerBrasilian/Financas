package com.ifinancas.ui.components

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.Button
import androidx.compose.material.ButtonDefaults
import androidx.compose.material.MaterialTheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp

@Preview
@Composable
fun AuthButton(
    isLoading: Boolean = false,
    text: String = "",
    backgroundColor: Color = Color.Blue,
    disableClickIfLoading: Boolean = false,
    onClick: () -> Unit = {},
) {
    Button(
        enabled = !isLoading,
        onClick = onClick,
        colors = ButtonDefaults.buttonColors(backgroundColor),
        border = BorderStroke(
            width = 1.dp,
            color = MaterialTheme.colors.primary
        ),
        modifier = Modifier
            .fillMaxWidth()
            .height(50.dp)
    ) {
        TextOrLoading(isLoading = isLoading, text = text)
    }
}