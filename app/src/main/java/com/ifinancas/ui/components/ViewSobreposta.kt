package com.ifinancas.ui.components

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.offset
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp

@Preview
@Composable
fun ViewSobreposta(children:@Composable ()->Unit = {}){
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .offset(y = (-10).dp),
        contentAlignment = Alignment.Center
    ) {
        children()
    }
}