package com.ifinancas.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.ifinancas.data.sealedClass.MenuItems

@Composable
fun FinancialBalanceSelectedMenuItem(
    item: MenuItems,
    circleColor: Color,
    onChangeTag: (tagSelected: String) -> Unit,
) {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .clickable { onChangeTag(item.tag.tag) },
        verticalArrangement = Arrangement.Center
    ) {
        Spacer(modifier = Modifier.height(5.dp))
        Row(
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(10.dp),
            modifier = Modifier.padding(start = 10.dp, top = 10.dp)
        ) {
            Box(
                modifier = Modifier
                    .background(color = circleColor, shape = CircleShape)
                    .size(30.dp)
            )
            Text(text = item.tag.tag, color = Color.Black, fontSize = 16.sp)
        }

        Spacer(modifier = Modifier.height(5.dp))
        Line()
    }
}