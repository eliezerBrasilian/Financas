package com.ifinancas.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.snapshots.SnapshotStateList
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.hilt.navigation.compose.hiltViewModel
import com.ifinancas.data.dataclass.Register
import com.ifinancas.data.sealedClass.categories
import com.ifinancas.ui.screens.getTotalPerItem
import com.ifinancas.ui.viewModel.DateTimeViewModel
import compose.icons.FontAwesomeIcons
import compose.icons.fontawesomeicons.Solid
import compose.icons.fontawesomeicons.solid.CaretLeft
import compose.icons.fontawesomeicons.solid.CaretRight
import java.util.Date

@Composable
fun ChartScreenOverlayView(
    currentDate: Date,
    incrementMonth: () -> Unit,
    decrementMonth: () -> Unit,
    sortRegistersList: SnapshotStateList<Register>,
) {
    val dateTimeViewModel: DateTimeViewModel = hiltViewModel()

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color.White)
    ) {

        DragableView()

        Box(
            modifier = Modifier
                .fillMaxWidth()
                .padding(15.dp), contentAlignment = Alignment.TopCenter
        ) {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(10.dp), horizontalArrangement = Arrangement.Center,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Icon(
                    imageVector = FontAwesomeIcons.Solid.CaretLeft,
                    modifier = Modifier
                        .size(20.dp)
                        .clickable { decrementMonth() },
                    contentDescription = null
                )
                Text(
                    text = dateTimeViewModel.getMonthName(currentDate),
                    fontSize = 16.sp,
                    color = Color.Black,
                    fontWeight = FontWeight.Bold,
                )
                Icon(
                    imageVector = FontAwesomeIcons.Solid.CaretRight,
                    modifier = Modifier
                        .size(20.dp)
                        .clickable { incrementMonth() },
                    contentDescription = null
                )
            }
        }

        PieChartView(registers = sortRegistersList)
        Spacer(modifier = Modifier.height(20.dp))

        LazyColumn(modifier = Modifier.padding(15.dp)) {
            items(categories) {
                PieChartItem(
                    total = getTotalPerItem(it.category.value, sortRegistersList),
                    category = it.category.value,
                    color = it.color
                )
            }
        }
    }
}
