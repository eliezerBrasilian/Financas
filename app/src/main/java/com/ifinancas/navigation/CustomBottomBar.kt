package com.ifinancas.components

import android.util.Log
import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.RowScope
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.navigationBarsPadding
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.size
import androidx.compose.material.BottomNavigation
import androidx.compose.material.BottomNavigationItem
import androidx.compose.material.ContentAlpha
import androidx.compose.material3.LocalContentColor
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavDestination
import androidx.navigation.NavDestination.Companion.hierarchy
import androidx.navigation.NavGraph.Companion.findStartDestination
import androidx.navigation.NavHostController
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.compose.rememberNavController
import com.ifinancas.navigation.BottomBarScreen
import com.ifinancas.navigation.CircleBtnAdd
import com.ifinancas.ui.viewModel.PopUpHomeViewModel
import com.ifinancas.utils.AppTag

@Preview
@Composable
fun CustomBottomBar(
    navController: NavHostController = rememberNavController(),
    popUpHomeViewModel: PopUpHomeViewModel = viewModel()
) {
    val screens = listOf(
        BottomBarScreen.Home,
        BottomBarScreen.Historico,
        BottomBarScreen.Grafico,
        BottomBarScreen.Extra,
    )
    val navBackStackEntry by navController.currentBackStackEntryAsState()
    val currentDestination = navBackStackEntry?.destination

    val bottomBarDestination = screens.any { it.route == currentDestination?.route }

    if (bottomBarDestination) {
        Box {
            BottomNavigation(
                modifier = Modifier.navigationBarsPadding(),
                backgroundColor = Color.White,
                elevation = 0.dp,
            ) {
                screens.forEachIndexed { index, screen ->
                    if (index == 2) {
                        Spacer(Modifier.weight(1f))
                    }
                    AddItem(
                        screen = screen,
                        currentDestination = currentDestination,
                        navController = navController
                    )
                }
            }
            CircleBtnAdd(
                Modifier
                    .align(Alignment.TopCenter)
                    .offset(y = (-25).dp)) {
                popUpHomeViewModel.activeVisibility()

                val currentRoute = navController.currentDestination?.route
                Log.d(AppTag, "rota: $currentRoute")

                if (currentRoute != BottomBarScreen.Home.route) {
                    navController.navigate(BottomBarScreen.Home.route) {
                        popUpTo(BottomBarScreen.Home.route) { inclusive = true }
                        launchSingleTop = true
                    }
                }


            }
        }
    }
}

@Composable
fun RowScope.AddItem(
    screen: BottomBarScreen,
    currentDestination: NavDestination?,
    navController: NavHostController
) {

    val selected = currentDestination?.hierarchy?.any {
        it.route == screen.route
    } == true

    BottomNavigationItem(
        label = {
            Text(
                text = screen.title,
                color = if (selected) Color(0xffFF0303) else LocalContentColor.current,
                fontSize = 12.sp
            )
        },
        icon = {
            Image(
                painter = painterResource(if (selected) screen.imageIconSelected else screen.imageIcon),
                contentDescription = null,
                modifier = Modifier.size(22.dp)
            )
        },
        selected = selected,
        unselectedContentColor = LocalContentColor.current.copy(alpha = ContentAlpha.disabled),
        onClick = {
            navController.navigate(screen.route) {
                popUpTo(navController.graph.findStartDestination().id)
                launchSingleTop = true
            }
        },
    )
}
