import { Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container } from 'reactstrap';
// import Header from './header/Header';
import HorizontalHeader from './header/HorizontalHeader';
//import Customizer from './customizer/Customizer';
import HorizontalSidebar from './sidebars/horizontal/HorizontalSidebar';

const FullLayout = () => {
  const customizerToggle = useSelector((state) => state.customizer.customizerSidebar);
  const toggleMiniSidebar = useSelector((state) => state.customizer.isMiniSidebar);
  const showMobileSidebar = useSelector((state) => state.customizer.isMobileSidebar);
  const topbarFixed = useSelector((state) => state.customizer.isTopbarFixed);
  const isFixedSidebar = useSelector((state) => state.customizer.isSidebarFixed);

  const location = useLocation();
  const getTitle = location.pathname.split('/')[1];

  console.log(getTitle);

  return (
    <main>
      <div className={`pageWrapper d-md-block d-lg-flex ${toggleMiniSidebar ? 'isMiniSidebar' : ''}`}>
        {/******** Sidebar **********/}
        

        {/********Content Area**********/}

        <div className={`contentArea ${topbarFixed ? 'fixedTopbar' : ''}`}>
          {/********header**********/}
          <HorizontalHeader />
          <br></br>
          <HorizontalSidebar />

          {/********Middle Content**********/}
          <div className={isFixedSidebar ? 'HsidebarFixed' : ''}>
            <div className="bg-white p-3 text-capitalize">
              <Container fluid className="boxContainer">
                <h5 className="fw-medium mb-0">{}</h5>
              </Container>
            </div>
          </div>

          <Container fluid className="p-4 boxContainer">
            <div>
              <Outlet />
            </div>
            {/* <Customizer className={customizerToggle ? 'showCustomizer' : ''} /> */}
            {showMobileSidebar || customizerToggle ? <div className="sidebarOverlay" /> : ''}
          </Container>
        </div>
      </div>
    </main>
  );
};

export default FullLayout;
