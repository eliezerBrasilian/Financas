package com.ifinancas.ui.components

import androidx.compose.foundation.ExperimentalFoundationApi
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.combinedClickable
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
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.KeyboardArrowDown
import androidx.compose.material.icons.filled.KeyboardArrowUp
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.runtime.snapshots.SnapshotStateList
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.hilt.navigation.compose.hiltViewModel
import com.ifinancas.R
import com.ifinancas.data.dataclass.Register
import com.ifinancas.data.enums.Tags
import com.ifinancas.ui.viewModel.DateTimeViewModel
import compose.icons.FontAwesomeIcons
import compose.icons.fontawesomeicons.Solid
import compose.icons.fontawesomeicons.solid.CaretLeft
import compose.icons.fontawesomeicons.solid.CaretRight
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


        LazyColumn {
            items(sortRegistersList) {
                TransactionItem(it, handleDeleteRegister)
            }
        }

    }
}

@OptIn(ExperimentalFoundationApi::class)
@Composable
fun TransactionItem(register: Register, handleDeleteRegister: (id: Register) -> Unit) {
    val dateTimeViewModel: DateTimeViewModel = hiltViewModel()

    var expanded by remember {
        mutableStateOf(false)
    }

    val transactionIconRelated = when {
        register.tag == Tags.REVENUE.tag -> R.drawable.receita_menu;
        register.tag == Tags.RESERVATION.tag -> R.drawable.pig_menu
        else -> R.drawable.despesa_menu
    }

    Column(
        modifier = Modifier.combinedClickable(
            onClick = {},
            onLongClick = { handleDeleteRegister(register) })
    ) {
        if (!expanded) {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(10.dp), verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(10.dp)
                ) {
                    Image(
                        painter = painterResource(id = transactionIconRelated),
                        contentDescription = null,
                        modifier = Modifier
                            .size(22.dp)
                    )
                    Column {
                        if (register.description.length > 15) {
                            Row(verticalAlignment = Alignment.CenterVertically,
                                horizontalArrangement = Arrangement.spacedBy(5.dp),
                                modifier = Modifier.clickable { expanded = !expanded }) {
                                Text(
                                    text = register.description.take(10) + "...",
                                    fontSize = 16.sp,
                                    color = Color.Black,
                                    fontWeight = FontWeight.Bold,
                                )
                                Icon(
                                    imageVector = Icons.Default.KeyboardArrowDown,
                                    contentDescription = null
                                )
                            }
                        } else {
                            Text(
                                text = register.description,
                                fontSize = 16.sp,
                                color = Color.Black,
                                fontWeight = FontWeight.Bold,
                            )
                        }

                        Text(
                            text = dateTimeViewModel.formatTimestamp(register.createdAt),
                            fontSize = 11.sp,
                            color = Color.Black,
                            fontWeight = FontWeight.Normal,
                        )
                        TransactionHistoryCategoryRow(register)
                    }
                }

                PriceView(register)
            }
        } else {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(10.dp),
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                Icon(imageVector = Icons.Default.KeyboardArrowUp, contentDescription = null,
                    modifier = Modifier
                        .clickable { expanded = !expanded })
                Text(
                    text = register.description,
                    fontSize = 16.sp,
                    color = Color.Black,
                    fontWeight = FontWeight.Bold,
                )
                Image(
                    painter = painterResource(id = transactionIconRelated),
                    contentDescription = null,
                    modifier = Modifier
                        .size(22.dp)
                )
                TransactionHistoryCategoryRow(register)
                PriceView(register)
            }
        }

        Spacer(modifier = Modifier.height(10.dp))
        Line()
        Spacer(modifier = Modifier.height(10.dp))
    }
}

