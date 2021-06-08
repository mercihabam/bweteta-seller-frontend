import CIcon from "@coreui/icons-react";
import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CWidgetDropdown } from "@coreui/react";
import "@coreui/coreui/dist/css/coreui.min.css";


export function GradientWidget(){
    
    return (
        <div className={'row mt-2'}>
          <div className={'col-6'}>
            <CWidgetDropdown
              color="gradient-warning"
              header="9.823"
              text="Members online"
              footerSlot={
                <div
                  className={'text-center'}
                  style={{ height: '100px' }}
                >
                  (Chart)
                </div>
              }
            >
              <CDropdown>
                <CDropdownToggle color="transparent">
                  <CIcon name={'cilSettings'} size={'md'}/>
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
}