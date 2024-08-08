package com.ifinancas.ui.components

import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.ifinancas.data.montserratFamily
import compose.icons.FontAwesomeIcons
import compose.icons.fontawesomeicons.Solid
import compose.icons.fontawesomeicons.solid.ArrowLeft

@Composable
fun ShopScreenTitleRow(){
    Row(
        verticalAlignment = Alignment.CenterVertically,
        modifier = Modifier.height(30.dp)
    ) {
        Icon(
            imageVector = FontAwesomeIcons.Solid.ArrowLeft,
            contentDescription = null,
            modifier = Modifier.size(15.dp),
            tint = Color.White
        )
        Spacer(modifier = Modifier.width(10.dp))
        Text(
            text = "Finanças", fontFamily = montserratFamily,
            fontWeight = FontWeight.Bold,
            color = Color.White
        )
        Spacer(modifier = Modifier.width(5.dp))
        Text(
            text = "Shop", fontFamily = montserratFamily,
            color = Color.White, fontWeight = FontWeight.W300
        )

    }
}