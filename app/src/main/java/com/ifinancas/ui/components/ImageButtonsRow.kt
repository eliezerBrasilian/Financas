package com.ifinancas.ui.components

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Row
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

@Composable
fun ImageButtonsRow(descartar: () -> Unit = {}, salvar: () -> Unit = {}) {
    Row(horizontalArrangement = Arrangement.spacedBy(10.dp)) {
        Button(onClick = descartar, colors = ButtonDefaults.buttonColors(Color.LightGray)) {
            Text("Descartar", fontSize = 14.sp, color = Color.White)
        }
        Button(onClick = salvar) {
            Text("Salvar", fontSize = 14.sp, color = Color.White)
        }
    }
}