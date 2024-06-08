


import { BigChartBox } from "../../components/bigChartBox/BigChartBox";
import { ChartBox } from "../../components/chartBox/ChartBox";
import { PieChartBox } from "../../components/pieCartBox/PieChartBox";
import {
  chartBoxConversion,
  chartBoxProduct,
  chartBoxRevenue,
  chartBoxUser,
} from "../../data";
import "./home.scss";

 export const Home = () => {
    return(
        <div className="home">
      <div className="box box2">
        <ChartBox {...chartBoxUser} />
      </div>
      <div className="box box3">
        <ChartBox {...chartBoxProduct} />
      </div>
      <div className="box box4">
        <PieChartBox />
      </div>
      <div className="box box6">
        <ChartBox {...chartBoxRevenue} />
      </div>
      <div className="box box7">
        <BigChartBox />
      </div>
      <div className="box box9">
      <ChartBox {...chartBoxConversion} />
      </div>
    </div>
    )
}