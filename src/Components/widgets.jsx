import CIcon from "@coreui/icons-react";
import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CWidgetBrand, CWidgetDropdown } from "@coreui/react";
import "@coreui/coreui/dist/css/coreui.min.css";
import ChartLineSimple from "../Views/charts/chartLineSimple";
import { FacebookOutlined } from "@ant-design/icons";


export function GradientWidget(props){
  const { color, text, header, pointColor, iconWidget } = props;
    
    return (
        <div className={'row mt-2'}>
          <div className={'widget'}>
            <CWidgetDropdown
              color={color}
              header={header}
              text={text}
              footerSlot={
                <div
                  className={'text-center'}
                  style={{ height: '100px' }}
                >
                  <ChartLineSimple
                    pointed
                    className="c-chart-wrapper mt-3 mx-3"
                    style={{height: '70px'}}
                    dataPoints={[65, 59, 84, 84, 51, 55, 40]}
                    pointHoverBackgroundColor={pointColor}
                    label={text}
                    labels="months"
                  />
                </div>
              }
            >
              <CDropdown>
                <CDropdownToggle color="transparent">
                  <CIcon name={'cilSettings'} size={'md'}/>
                  {iconWidget}
                </CDropdownToggle>
                <CDropdownMenu className="p-0" placement="bottom-end">
                  <CDropdownItem>Action</CDropdownItem>
                  <CDropdownItem>Another action</CDropdownItem>
                  <CDropdownItem>Something else here...</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </CWidgetDropdown>
          </div>
        </div>
      )
};




export function FacebookWidget(){

  return(
      <div className="widget">
        <CWidgetBrand
          color="facebook"
          rightHeader="2k"
          rightFooter="j'aime"
          leftHeader="12"
          leftFooter="publications"
          className="facebook-widget"
        >
          <CIcon
            name="cib-facebook"
            height="52"
            className="my-4"
          />
          <FacebookOutlined className="icon-facebook" />
          <ChartLineSimple
            className="position-absolute w-100 h-100"
            backgroundColor="rgba(255,255,255,.1)"
            dataPoints={[65, 59, 84, 84, 51, 55, 40]}
            label="Friends"
            labels="months"
          />
        </CWidgetBrand>
      </div>
  )
}