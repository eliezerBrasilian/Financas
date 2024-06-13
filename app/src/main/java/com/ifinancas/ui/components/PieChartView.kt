package com.ifinancas.ui.components

import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.ifinancas.data.dataclass.Register
import com.ifinancas.data.sealedClass.categories
import com.ifinancas.ui.screens.chart.getTotalPerItem
import me.bytebeats.views.charts.pie.PieChart
import me.bytebeats.views.charts.pie.PieChartData
import me.bytebeats.views.charts.pie.render.SimpleSliceDrawer
import me.bytebeats.views.charts.simpleChartAnimation

@Composable
fun PieChartView(registers: List<Register>) {
    val slices = mutableListOf<PieChartData.Slice>()
    categories.forEach {
        val sliceItem = PieChartData.Slice(
            getTotalPerItem(it.category.value, registers).toFloat(),
            it.color
        )
        slices.add(sliceItem)
    }

    PieChart(
        pieChartData = PieChartData(
            slices = slices
        ),
        modifier = Modifier
            .fillMaxWidth()
            .height(120.dp),
        animation = simpleChartAnimation(),
        sliceDrawer = SimpleSliceDrawer()
    )
}