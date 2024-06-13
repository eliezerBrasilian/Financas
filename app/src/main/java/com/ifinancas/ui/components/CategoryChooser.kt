package com.ifinancas.ui.components

import androidx.compose.foundation.Image
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.KeyboardArrowDown
import androidx.compose.material.icons.filled.KeyboardArrowUp
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.ifinancas.R
import com.ifinancas.data.enums.Category

@Preview
@Composable
fun CategoryChooser(
    categorySelected: Category = Category.OUTROS,
    handleCategoryChange: (category: Category) -> Unit = {},
    categoryExpanded: Boolean = false,
    toogleCategoryExpanded: () -> Unit = {}
) {
    val categories = listOf(
        Category.APOSTAS,
        Category.ASSINATURA,
        Category.CASA,
        Category.LANCHE_FASTFOOD,
        Category.LAZER,
        Category.TRABALHO,
        Category.INVESTIMENTO,
        Category.OUTROS,
        Category.SAUDE,
    )
    Column(modifier = Modifier.fillMaxWidth()) {
        Row(
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.Center,
            modifier = Modifier.fillMaxWidth()
        ) {
            Image(
                painter = painterResource(id = R.drawable.categoria),
                contentDescription = null,
                modifier = Modifier.size(35.dp)
            )
            Spacer(modifier = Modifier.width(10.dp))
            Text(
                text = if (categorySelected != Category.OUTROS) categorySelected.value else "Categoria",
                fontSize = 13.sp,
                color = Color.Black,
                fontWeight = FontWeight.SemiBold,
                modifier = Modifier
                    .clickable {
                        toogleCategoryExpanded()
                    }
            )
            Icon(imageVector = if (categoryExpanded) Icons.Default.KeyboardArrowUp else Icons.Default.KeyboardArrowDown,
                contentDescription = null,
                tint = Color.Black,
                modifier = Modifier
                    .size(17.dp)
                    .clickable {
                        toogleCategoryExpanded()
                    })
        }

        Spacer(modifier = Modifier.height(10.dp))

        if (categoryExpanded)
            LazyColumn(
                modifier = Modifier
                    .border(
                        width = 1.dp,
                        color = Color.LightGray,
                        shape = RoundedCornerShape(12.dp)
                    )
                    .fillMaxWidth()
                    .padding(10.dp)
            ) {
                items(categories) {
                    CategoryChooserItem(categorySelected, it, handleCategoryChange)
                }
            }
    }
}