package com.ifinancas.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.snapshots.SnapshotStateList
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.hilt.navigation.compose.hiltViewModel
import com.ifinancas.data.dataclass.Register
import com.ifinancas.ui.viewModel.DateTimeViewModel
import java.util.Date


@Composable
fun TransactionHistoryOverlayView(
    sortRegistersList: SnapshotStateList<Register>,
    currentDate: Date,
    incrementMonth: () -> Unit,
    decrementMonth: () -> Unit,
    handleDeleteRegister: (id: Register) -> Unit
) {
    val dateTimeViewModel: DateTimeViewModel = hiltViewModel()

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color.White, RoundedCornerShape(topStart = 12.dp, topEnd = 12.dp))
    ) {
        DragableView()

        MonthView(decrementMonth, dateTimeViewModel, currentDate, incrementMonth)

        if (sortRegistersList.size == 0) {
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(top = 20.dp)
            ) {
                Text(
                    text = "Nenhum registro encontrado!",
                    fontSize = 15.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color.Black,
                    textAlign = TextAlign.Center,
                    modifier = Modifier.fillMaxWidth()
                )
            }
        }
        LazyColumn {
            items(sortRegistersList) {
                TransactionItem(it, handleDeleteRegister)
            }
        }

    }
}

