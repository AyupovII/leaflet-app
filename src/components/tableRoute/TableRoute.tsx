import { useDispatch, useSelector } from "react-redux";
import style from "./tableRoute.module.scss";
import { setCurrentRoute } from "../../routeMapState";


const TableRoute = () => {
  const allMarkers = useSelector((state: any) => state.routeMap.allMarkers);
  const dispatch = useDispatch();
  return (
    <div className={style.container}>
      <table>
        <thead>
          <tr>
            <th>Маршрут</th>
            {allMarkers.map((_: [], index: number) => {
              return <th>{`Точка ${index + 1} (lat, lng)`}</th>
            })}

          </tr>
        </thead>
        <tbody>
            {allMarkers.map((routeList: any, index: number) => {
              return <tr onClick={()=>dispatch(setCurrentRoute(index))} className={style.router}>
                <td>{`Маршрут № ${index + 1}`}</td>
                {routeList.map((marker: { geocode: string[] }) => {
                  // console.log(marker);
                  return <td>{marker.geocode.join("\n")}</td>
                })}
              </tr>
            })}
        </tbody>
      </table>
    </div>
  )
};

export default TableRoute;