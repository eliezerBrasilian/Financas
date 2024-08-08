package com.ifinancas.ui.components

import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.tween
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material.Icon
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.filled.Menu
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.livedata.observeAsState
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.rotate
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController
import coil.compose.AsyncImage
import com.adapty.internal.utils.InternalAdaptyApi
import com.ifinancas.R
import com.ifinancas.navigation.NavigationScreens
import com.ifinancas.ui.theme.MAINPURPLE
import com.ifinancas.ui.viewModel.FinancialOperationsViewModel
import com.ifinancas.ui.viewModel.ShopTheme
import com.ifinancas.ui.viewModel.UserViewModel

@OptIn(InternalAdaptyApi::class)
@Composable
fun HomeBlueTop(
    nav: NavHostController,
    toogleMonthListVisibility: () -> Unit = {},
    toogleMenuListVisibility: () -> Unit = {},
    monthListVisible: Boolean = false,
    menuListVisibile: Boolean = false,
    financialOperationsViewModel: FinancialOperationsViewModel,
    monthSelected: String,
    userViewModel: UserViewModel,
    balanceIsVisible: Boolean,
    toogleBalanceVisibility: () -> Unit,
    appTheme: ShopTheme?
) {

    var isRotated by remember { mutableStateOf(false) }
    val photo by userViewModel.photo.observeAsState(initial = null)
    val rotationAngle by animateFloatAsState(
        targetValue = if (isRotated) 360F else 0f,
        animationSpec = tween(durationMillis = 500)
    )

    if (appTheme != null) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .background(appTheme.homeTopBackgroundColor ?: MAINPURPLE)
                .padding(15.dp)
        ) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                AsyncImage(model = if (photo.isNullOrEmpty()) R.drawable.user_profile else photo,
                    contentDescription = null,
                    contentScale = ContentScale.FillBounds,
                    modifier = Modifier
                        .size(40.dp)
                        .clip(
                            CircleShape
                        )
                        .clickable {
                            nav.navigate(NavigationScreens.PROFILE)
                        })

                Row(
                    horizontalArrangement = Arrangement.spacedBy(15.dp)
                ) {
//                    Icon(imageVector = FontAwesomeIcons.Solid.Crown,
//                        contentDescription = null,
//                        tint = Color.White,
//                        modifier = Modifier
//                            .size(21.dp)
//                            .clickable {
//                                nav.navigate(NavigationScreens.SHOPSCREEN)
//                            }
//                    )

                    Icon(imageVector = if (menuListVisibile) Icons.Default.Close else Icons.Default.Menu,
                        contentDescription = null,
                        tint = Color.White,
                        modifier = Modifier
                            .rotate(rotationAngle)
                            .size(21.dp)
                            .clickable {
                                isRotated = !isRotated
                                toogleMenuListVisibility()
                            })
                }
            }
            MonthSelectable(toogleMonthListVisibility, monthListVisible, monthSelected)
            Spacer(modifier = Modifier.height(10.dp))
            SaldoComponent(financialOperationsViewModel, balanceIsVisible, toogleBalanceVisibility)
            Spacer(modifier = Modifier.height(10.dp))
        }
    }
}


