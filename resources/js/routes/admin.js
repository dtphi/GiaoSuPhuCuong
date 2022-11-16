import AuthLayout from 'v@admin/layouts/auth'
import Login from 'v@admin/auth/Login'
import DefaultLayout from 'v@admin/layouts/default'
import LinhMucPage from 'v@admin/linhmucs'
import LinhMucBangCapPage from 'v@admin/linhmucbangcaps'
import LinhMucChucThanhPage from 'v@admin/linhmucchucthanhs'
import LinhMucVanThuPage from 'v@admin/linhmucvanthus'
import LinhMucThuyenChuyenPage from 'v@admin/linhmucthuyenchuyens'
import GiaoPhanPage from 'v@admin/giaophans'
import GiaoHatPage from 'v@admin/giaohats'
import GiaoXuPage from 'v@admin/giaoxus'
import GiaoDiemPage from 'v@admin/giaodiems'
import CoSoGiaoPhanPage from 'v@admin/cosogiaophans'
import CongDoanTuSiPage from 'v@admin/congdoantusis'
import DongPage from 'v@admin/dongs'
import ThanhPage from 'v@admin/thanhs'
import ChucVuPage from 'v@admin/chucvus'
import LeChinhPage from 'v@admin/lechinhs'
import SystemPage from 'v@admin/systems'
import DashboardPage from 'v@admin/dashboards'
import CategoryListPage from 'v@admin/categorys'
import UserListPage from 'v@admin/users'
import InformationListPage from 'v@admin/informations'
import FileManagerListPage from 'v@admin/filemanagers'
import GiaoPhanInfosPage from 'v@admin/giaophaninfos'
import GiaoPhanCatesPage from 'v@admin/giaophancates'
import RestrictIpsPage from 'v@admin/restrictips'
import AlbumsPage from 'v@admin/albums'
import GroupAlbumsPage from 'v@admin/groupalbums'
import NgayLePage from 'v@admin/ngayles';
import LichCongGiaoPage from 'v@admin/lichconggiao';

import BootstrapVue from "bootstrap-vue"

import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

import {
  config,
} from '../common/config'

export default [{
  path: '/' + config.adminPrefix,
  component: {
    render: c => c('router-view'),
  },
  children: [{
    path: '',
    redirect: {
      name: config.adminRoute.login.name,
    },
  }, {
    path: config.adminRoute.login.path,
    component: Login,
    name: config.adminRoute.login.name,
    meta: {
      layout: AuthLayout,
      role: 'admin',
      show: {
        footer: true,
      },
      title: 'Login | ' + config.site_name,
    },
  }, {
    path: config.adminRoute.phone_verify.path,
    component: null,
    name: config.adminRoute.phone_verify.name,
    meta: {
      layout: null,
      role: 'admin',
      show: {
        footer: true,
      },
      title: 'Quản trị | ' + config.site_name,
    },
  }, {
    path: config.adminRoute.dashboard.path,
    component: DashboardPage,
    name: config.adminRoute.dashboard.name,
    meta: {
      layout: DefaultLayout,
      role: 'admin',
      show: {
        footer: true,
      },
      title: 'Quản trị | ' + config.site_name,
    },
  }, {
    path: 'module-*',
    component: () =>
      import('v@admin/modules'),
    name: 'admin.module.list',
    meta: {
      layout: DefaultLayout,
      auth: true,
      breadcrumbs: [{
        name: 'Quản trị',
        linkName: 'admin.dashboards',
        linkPath: '/dashboards',
      }, {
        name: 'Phần mở rộng',
      }],
      header: 'Phần mở rộng',
      role: 'admin',
      title: 'Danh mục tin | ' + config.site_name,
      show: {
        footer: true,
      },
    },
  }, {
    path: 'news-categories',
    component: {
      render: c => c('router-view'),
    },
    children: [{
      path: '',
      component: CategoryListPage,
      name: 'admin.category.list',
      meta: {
        layout: DefaultLayout,
        auth: true,
        breadcrumbs: [{
          name: 'Quản trị',
          linkName: 'admin.dashboards',
          linkPath: '/dashboards',
        }, {
          name: 'Danh mục tin',
        }],
        header: 'Danh sách danh mục tin',
        role: 'admin',
        title: 'Danh mục tin | ' + config.site_name,
        show: {
          footer: true,
        },
      },
    }, {
      path: 'add',
      component: () =>
        import('v@admin/categorys/add'),
      name: 'admin.category.add',
      meta: {
        layout: DefaultLayout,
        auth: true,
        breadcrumbs: [{
          name: 'Quản trị',
          linkName: 'admin.dashboards',
          linkPath: '/dashboards',
        }, {
          name: 'Danh mục tin',
          linkName: 'admin.category.list',
          linkPath: '/news-categories',
        }, {
          name: 'Thêm danh mục',
        }],
        header: 'Thêm danh mục tin tức',
        role: 'admin',
        title: 'Thêm danh mục | ' + config.site_name,
        show: {
          footer: true,
        },
      },
    }, {
      path: 'edit/:categoryId',
      component: () =>
        import('v@admin/categorys/edit'),
      name: 'admin.category.edit',
      meta: {
        layout: DefaultLayout,
        auth: true,
        breadcrumbs: [{
          name: 'Quản trị',
          linkName: 'admin.dashboards.list',
          linkPath: '/dashboards',
        }, {
          name: 'Danh mục tin',
          linkName: 'admin.category',
          linkPath: '/news-categories',
        }, {
          name: 'Cập nhật danh mục',
        }],
        header: 'CategoryEdit',
        role: 'admin',
        title: 'Edit category | ' + config.site_name,
        show: {
          footer: true,
        },
      },
    }],
  }, {
    path: 'users',
    component: {
      render: c => c('router-view'),
    },
    children: [{
      path: '',
      component: UserListPage,
      name: 'admin.users.list',
      meta: {
        auth: true,
        breadcrumbs: [{
          name: 'Quản trị',
          linkName: 'admin.dashboards',
          linkPath: '/dashboards',
        }, {
          name: 'Người dùng',
        }],
        header: 'Danh sách người dùng',
        layout: DefaultLayout,
        role: 'admin',
        title: 'Users | ' + config.site_name,
      },
    }],
  }, {
    path: 'informations',
    component: {
      render: c => c('router-view'),
    },
    children: [{
      path: '',
      component: InformationListPage,
      name: 'admin.informations.list',
      meta: {
        auth: true,
        breadcrumbs: [{
          name: 'Quản trị',
          linkName: 'admin.dashboards',
          linkPath: '/dashboards',
        }, {
          name: 'Tin Tức',
        }],
        header: 'Danh sách tin tức',
        layout: DefaultLayout,
        role: 'admin',
        title: 'Tin tức | ' + config.site_name,
      },
    }, {
      path: 'add',
      component: () =>
        import('v@admin/informations/add'),
      name: 'admin.informations.add',
      meta: {
        auth: true,
        breadcrumbs: [{
          name: 'Quản trị',
          linkName: 'admin.dashboards',
          linkPath: '/dashboards',
        }, {
          name: 'Tin Tức',
          linkName: 'admin.informations.list',
          linkPath: '/informations',
        }, {
          name: 'Thêm tin tức',
        }],
        header: 'Thêm tin tức',
        layout: DefaultLayout,
        role: 'admin',
        title: 'Thêm tin tức | ' + config.site_name,
      },
    }, {
      path: 'edit/:infoId',
      component: () =>
        import('v@admin/informations/edit'),
      name: 'admin.informations.edit',
      meta: {
        auth: true,
        breadcrumbs: [{
          name: 'Quản trị',
          linkName: 'admin.dashboards',
          linkPath: '/dashboards',
        }, {
          name: 'Tin Tức',
          linkName: 'admin.informations.list',
          linkPath: '/informations',
        }, {
          name: 'Cập nhật tin tức',
        }],
        header: 'Cập nhật tin tức',
        layout: DefaultLayout,
        role: 'admin',
        title: 'Cập nhật tin tức | ' + config.site_name,
      },
    }],
  }, {
    path: 'slide-info-specials',
    component: {
      render: c => c('router-view'),
    },
    children: [{
      path: '',
      component: () =>
        import('v@admin/slideinfospecials'),
      name: 'admin.slide-info-specials.list',
      meta: {
        auth: true,
        breadcrumbs: [{
          name: 'Quản trị',
          linkName: 'admin.dashboards',
          linkPath: '/dashboards',
        }, {
          name: 'Slide Tin Tức',
        }],
        header: 'Danh sách slide tin tức',
        layout: DefaultLayout,
        role: 'admin',
        title: 'Slide Tin tức | ' + config.site_name,
      },
    }],
  }, {
    path: 'filemanagers',
    component: {
      render: c => c('router-view'),
    },
    children: [{
      path: '',
      component: FileManagerListPage,
      name: 'admin.filemanagers.list',
      meta: {
        auth: true,
        breadcrumbs: [{
          name: 'Quản trị',
          linkName: 'admin.dashboards',
          linkPath: '/dashboards',
        }, {
          name: 'Hình ảnh tin tức',
        }],
        header: 'Danh sách hình ảnh',
        layout: DefaultLayout,
        role: 'admin',
        title: 'Danh sách hình ảnh | ' + config.site_name,
      },
    }],
  }, {
    path: 'system',
    component: {
      render: c => c('router-view'),
    },
    children: [{
      path: '',
      component: SystemPage,
      name: 'admin.system.setting',
      meta: {
        layout: DefaultLayout,
        auth: true,
        breadcrumbs: [{
          name: 'Quản trị',
          linkName: 'admin.dashboards',
          linkPath: '/dashboards',
        }, {
          name: 'Cài đặt',
        }],
        header: 'Danh sách cài đặt',
        role: 'admin',
        title: 'Cài đặt chung | ' + config.site_name,
        show: {
          footer: true,
        },
      },
    }],
  }, {
    path: 'linh-mucs',
    component: {
      render: c => c('router-view'),
    },
    children: [{
      path: '',
      component: LinhMucPage,
      name: 'admin.linh.muc.list',
      meta: {
        layout: DefaultLayout,
        auth: true,
        breadcrumbs: [{
          name: 'Quản trị',
          linkName: 'admin.dashboards',
          linkPath: '/dashboards',
        }, {
          name: 'Linh mục',
        }],
        header: 'Danh sách linh mục',
        role: 'admin',
        title: 'Linh mục | ' + config.site_name,
        show: {
          footer: true,
        },
      },
    }, {
      path: 'add',
      component: () => import('v@admin/linhmucs/add'),
      name: 'admin.linh.muc.add',
      meta: {
        layout: DefaultLayout,
        auth: true,
        breadcrumbs: [{
          name: 'Quản trị',
          linkName: 'admin.dashboards',
          linkPath: '/dashboards',
        }, {
          name: 'Danh sách linh mục',
          linkName: 'admin.linh.muc.list',
          linkPath: '/linh-mucs',
        }, {
          name: 'Thêm Linh Muc',
        }],
        header: 'Thêm linh mục',
        role: 'admin',
        title: 'Thêm linh mục | ' + config.site_name,
        show: {
          footer: true,
        },
      },
    }, {
      path: 'edit/:linhmucId',
      component: () => import('v@admin/linhmucs/edit'),
      name: 'admin.linh.muc.edit',
      meta: {
        layout: DefaultLayout,
        auth: true,
        breadcrumbs: [{
          name: 'Quản trị',
          linkName: 'admin.dashboards',
          linkPath: '/dashboards',
        }, {
          name: 'Danh sách linh mục',
          linkName: 'admin.linh.muc.list',
          linkPath: '/linh-mucs',
        }, {
          name: 'Sửa Linh Muc',
        }],
        header: 'Thêm linh mục',
        role: 'admin',
        title: 'Thêm linh mục | ' + config.site_name,
        show: {
          footer: true,
        },
      },
    }],
  }, {
    path: 'bang-caps',
    component: {
      render: c => c('router-view'),
    },
    children: [{
      path: '',
      component: LinhMucBangCapPage,
      name: 'admin.linh.muc.bang.cap.list',
      meta: {
        layout: DefaultLayout,
        auth: true,
        breadcrumbs: [{
          name: 'Quản trị',
          linkName: 'admin.dashboards',
          linkPath: '/dashboards',
        }, {
          name: 'Cài đặt',
        }],
        header: 'Danh sách bằng cấp',
        role: 'admin',
        title: 'Bằng cấp | ' + config.site_name,
        show: {
          footer: true,
        },
      },
    }],
  }, {
    path: 'chuc-thanhs',
    component: {
      render: c => c('router-view'),
    },
    children: [{
      path: '',
      component: LinhMucChucThanhPage,
      name: 'admin.linh.muc.chuc.thanh.list',
      meta: {
        layout: DefaultLayout,
        auth: true,
        breadcrumbs: [{
          name: 'Quản trị',
          linkName: 'admin.dashboards',
          linkPath: '/dashboards',
        }, {
          name: 'Chức thánh',
        }],
        header: 'Danh sách chức thánh',
        role: 'admin',
        title: 'Chức thánh | ' + config.site_name,
        show: {
          footer: true,
        },
      },
    }],
  }, {
    path: 'van-thus',
    component: {
      render: c => c('router-view'),
    },
    children: [{
      path: '',
      component: LinhMucVanThuPage,
      name: 'admin.linh.muc.van.thu.list',
      meta: {
        layout: DefaultLayout,
        auth: true,
        breadcrumbs: [{
          name: 'Quản trị',
          linkName: 'admin.dashboards',
          linkPath: '/dashboards',
        }, {
          name: 'Văn thư',
        }],
        header: 'Danh sách văn thư',
        role: 'admin',
        title: 'Văn thư | ' + config.site_name,
        show: {
          footer: true,
        },
      },
    }],
  }, {
    path: 'thuyen-chuyens',
    component: {
      render: c => c('router-view'),
    },
    children: [{
      path: '',
      component: LinhMucThuyenChuyenPage,
      name: 'admin.linh.muc.thuyen.chuyen.list',
      meta: {
        layout: DefaultLayout,
        auth: true,
        breadcrumbs: [{
          name: 'Quản trị',
          linkName: 'admin.dashboards',
          linkPath: '/dashboards',
        }, {
          name: 'Thuyên chuyển',
        }],
        header: 'Danh sách thuyên chuyển',
        role: 'admin',
        title: 'Thuyên chuyển | ' + config.site_name,
        show: {
          footer: true,
        },
      },
    }],
  }, {
    path: 'giao-phans',
    component: {
      render: c => c('router-view'),
    },
    children: [{
      path: '',
      component: GiaoPhanPage,
      name: 'admin.giao.phan.list',
      meta: {
        layout: DefaultLayout,
        auth: true,
        breadcrumbs: [{
          name: 'Quản trị',
          linkName: 'admin.dashboards',
          linkPath: '/dashboards',
        }, {
          name: 'Giáo phận',
        }],
        header: 'Danh sách giáo phận',
        role: 'admin',
        title: 'Giao phận | ' + config.site_name,
        show: {
          footer: true,
        },
      },
    }, {
      path: 'add',
      component: () => import('v@admin/giaophans/add'),
      name: 'admin.giao.phan.add',
      meta: {
        layout: DefaultLayout,
        auth: true,
        breadcrumbs: [{
          name: 'Quản trị',
          linkName: 'admin.dashboards',
          linkPath: '/dashboards',
        }, {
          name: 'Danh sách giáo phận',
          linkName: 'admin.giao.phan.list',
          linkPath: '/giao-phans',
        }, {
          name: 'Giáo phận',
        }],
        header: 'Thêm giáo phận',
        role: 'admin',
        title: 'Giao phận | ' + config.site_name,
        show: {
          footer: true,
        },
      },
    }, {
      path: 'edit/:giaoPhanId',
      component: () => import('v@admin/giaophans/edit'),
      name: 'admin.giao.phan.edit',
      meta: {
        layout: DefaultLayout,
        auth: true,
        breadcrumbs: [{
          name: 'Quản trị',
          linkName: 'admin.dashboards',
          linkPath: '/dashboards',
        }, {
          name: 'Danh sách giáo phận',
          linkName: 'admin.giao.phan.list',
          linkPath: '/giao-phans',
        }, {
          name: 'Giáo phận',
        }],
        header: 'Sửa giáo phận',
        role: 'admin',
        title: 'Giao phận | ' + config.site_name,
        show: {
          footer: true,
        },
      },
    }],
  }, {
    path: 'giao-hats',
    component: {
      render: c => c('router-view'),
    },
    children: [{
      path: '',
      component: GiaoHatPage,
      name: 'admin.giao.hat.list',
      meta: {
        layout: DefaultLayout,
        auth: true,
        breadcrumbs: [{
          name: 'Quản trị',
          linkName: 'admin.dashboards',
          linkPath: '/dashboards',
        }, {
          name: 'Giáo hạt',
        }],
        header: 'Danh sách giáo hạt',
        role: 'admin',
        title: 'Giao hạt | ' + config.site_name,
        show: {
          footer: true,
        },
      },
    }, {
      path: 'add',
      component: () => import('v@admin/giaohats/add'),
      name: 'admin.giao.hat.add',
      meta: {
        layout: DefaultLayout,
        auth: true,
        breadcrumbs: [{
          name: 'Quản trị',
          linkName: 'admin.dashboards',
          linkPath: '/dashboards',
        }, {
          name: 'Danh sách giáo hạt',
          linkName: 'admin.giao.hat.list',
          linkPath: '/giao-hats',
        }, {
          name: 'Giáo hạt',
        }],
        header: 'Thêm giáo hạt',
        role: 'admin',
        title: 'Giao hạt | ' + config.site_name,
        show: {
          footer: true,
        },
      },
    }, {
      path: 'edit/:giaohatId',
      component: () => import('v@admin/giaohats/edit'),
      name: 'admin.giao.hat.edit',
      meta: {
        layout: DefaultLayout,
        auth: true,
        breadcrumbs: [{
          name: 'Quản trị',
          linkName: 'admin.dashboards',
          linkPath: '/dashboards',
        }, {
          name: 'Danh sách giáo hạt',
          linkName: 'admin.giao.hat.list',
          linkPath: '/giao-hats',
        }, {
          name: 'Giáo hạt',
        }],
        header: 'Sửa giáo hạt',
        role: 'admin',
        title: 'Giao hạt | ' + config.site_name,
        show: {
          footer: true,
        },
      },
    }],
  }, {
    path: 'giao-xus',
    component: {
      render: c => c('router-view'),
    },
    children: [{
      path: '',
      component: GiaoXuPage,
      name: 'admin.giao.xu.list',
      meta: {
        layout: DefaultLayout,
        auth: true,
        breadcrumbs: [{
          name: 'Quản trị',
          linkName: 'admin.dashboards',
          linkPath: '/dashboards',
        }, {
          name: 'Giáo xứ',
        }],
        header: 'Danh sách giáo xứ',
        role: 'admin',
        title: 'Giao xứ | ' + config.site_name,
        show: {
          footer: true,
        },
      },
    }, {
      path: 'add',
      component: () => import('v@admin/giaoxus/add'),
      name: 'admin.giao.xu.add',
      meta: {
        layout: DefaultLayout,
        auth: true,
        breadcrumbs: [{
          name: 'Quản trị',
          linkName: 'admin.dashboards',
          linkPath: '/dashboards',
        }, {
          name: 'Danh sách giáo xứ',
          linkName: 'admin.giao.xu.list',
          linkPath: '/giao-xus',
        }, {
          name: 'Giáo xứ',
        }],
        header: 'Thêm giáo xứ',
        role: 'admin',
        title: 'Giao xứ | ' + config.site_name,
        show: {
          footer: true,
        },
      },
    }, {
      path: 'edit/:giaoxuId',
      component: () => import('v@admin/giaoxus/edit'),
      name: 'admin.giao.xu.edit',
      meta: {
        layout: DefaultLayout,
        auth: true,
        breadcrumbs: [{
          name: 'Quản trị',
          linkName: 'admin.dashboards',
          linkPath: '/dashboards',
        }, {
          name: 'Danh sách giáo xứ',
          linkName: 'admin.giao.xu.list',
          linkPath: '/giao-xus',
        }, {
          name: 'Giáo xứ',
        }],
        header: 'Sửa giáo xứ',
        role: 'admin',
        title: 'Giao xứ | ' + config.site_name,
        show: {
          footer: true,
        },
      },
    }],
  }, {
    path: 'giao-diems',
    component: {
      render: c => c('router-view'),
    },
    children: [{
      path: '',
      component: GiaoDiemPage,
      name: 'admin.giao.diem.list',
      meta: {
        layout: DefaultLayout,
        auth: true,
        breadcrumbs: [{
          name: 'Quản trị',
          linkName: 'admin.dashboards',
          linkPath: '/dashboards',
        }, {
          name: 'Giáo điểm',
        }],
        header: 'Danh sách giáo điểm',
        role: 'admin',
        title: 'Giao điểm | ' + config.site_name,
        show: {
          footer: true,
        },
      },
    }],
  }, {
    path: 'co-so-giao-phans',
    component: {
      render: c => c('router-view'),
    },
    children: [{
      path: '',
      component: CoSoGiaoPhanPage,
      name: 'admin.co.so.giao.phan.list',
      meta: {
        layout: DefaultLayout,
        auth: true,
        breadcrumbs: [{
          name: 'Quản trị',
          linkName: 'admin.dashboards',
          linkPath: '/dashboards',
        }, {
          name: 'Cơ sở giáo phận',
        }],
        header: 'Danh sách cơ sở giáo phận',
        role: 'admin',
        title: 'Giao điểm | ' + config.site_name,
        show: {
          footer: true,
        },
      },
    }],
  }, {
    path: 'cong-doan-tu-sis',
    component: {
      render: c => c('router-view'),
    },
    children: [{
      path: '',
      component: CongDoanTuSiPage,
      name: 'admin.cong.doan.tu.si.list',
      meta: {
        layout: DefaultLayout,
        auth: true,
        breadcrumbs: [{
          name: 'Quản trị',
          linkName: 'admin.dashboards',
          linkPath: '/dashboards',
        }, {
          name: 'Công đoàn tu sĩ',
        }],
        header: 'Danh sách công đoàn tu sĩ',
        role: 'admin',
        title: 'Giao điểm | ' + config.site_name,
        show: {
          footer: true,
        },
      },
    }],
  }, {
    path: 'dongs',
    component: {
      render: c => c('router-view'),
    },
    children: [{
      path: '',
      component: DongPage,
      name: 'admin.dong.list',
      meta: {
        layout: DefaultLayout,
        auth: true,
        breadcrumbs: [{
          name: 'Quản trị',
          linkName: 'admin.dashboards',
          linkPath: '/dashboards',
        }, {
          name: 'Dòng',
        }],
        header: 'Danh sách dòng',
        role: 'admin',
        title: 'Dòng | ' + config.site_name,
        show: {
          footer: true,
        },
      },
    }, {
      path: 'add',
      component: () => import('v@admin/dongs/add'),
      name: 'admin.dong.add',
      meta: {
        layout: DefaultLayout,
        auth: true,
        breadcrumbs: [{
          name: 'Quản trị',
          linkName: 'admin.dashboards',
          linkPath: '/dashboards',
        }, {
          name: 'Danh sách dòng',
          linkName: 'admin.dong.list',
          linkPath: '/dongs',
        }, {
          name: 'Dòng',
        }],
        header: 'Thêm dòng',
        role: 'admin',
        title: 'Dòng | ' + config.site_name,
        show: {
          footer: true,
        },
      },
    }, {
      path: 'edit/:dongId',
      component: () => import('v@admin/dongs/edit'),
      name: 'admin.dong.edit',
      meta: {
        layout: DefaultLayout,
        auth: true,
        breadcrumbs: [{
          name: 'Quản trị',
          linkName: 'admin.dashboards',
          linkPath: '/dashboards',
        }, {
          name: 'Danh sách dòng',
          linkName: 'admin.dong.list',
          linkPath: '/dongs',
        }, {
          name: 'Dòng',
        }],
        header: 'Sửa dòng',
        role: 'admin',
        title: 'Dòng | ' + config.site_name,
        show: {
          footer: true,
        },
      },
    }],
  }, {
    path: 'thanhs',
    component: {
      render: c => c('router-view'),
    },
    children: [{
      path: '',
      component: ThanhPage,
      name: 'admin.thanh.list',
      meta: {
        layout: DefaultLayout,
        auth: true,
        breadcrumbs: [{
          name: 'Quản trị',
          linkName: 'admin.dashboards',
          linkPath: '/dashboards',
        }, {
          name: 'Thánh',
        }],
        header: 'Danh sách thánh',
        role: 'admin',
        title: 'Giao điểm | ' + config.site_name,
        show: {
          footer: true,
        },
      },
    }],
  }, {
    path: 'chuc-vus',
    component: {
      render: c => c('router-view'),
    },
    children: [{
      path: '',
      component: ChucVuPage,
      name: 'admin.chuc.vu.list',
      meta: {
        layout: DefaultLayout,
        auth: true,
        breadcrumbs: [{
          name: 'Quản trị',
          linkName: 'admin.dashboards',
          linkPath: '/dashboards',
        }, {
          name: 'Chức vụ',
        }],
        header: 'Danh sách chức vụ',
        role: 'admin',
        title: 'Chức vụ | ' + config.site_name,
        show: {
          footer: true,
        },
      },
    }],
  }, {
    path: 'le-chinhs',
    component: {
      render: c => c('router-view'),
    },
    children: [{
      path: '',
      component: LeChinhPage,
      name: 'admin.le.chinh.list',
      meta: {
        layout: DefaultLayout,
        auth: true,
        breadcrumbs: [{
          name: 'Quản trị',
          linkName: 'admin.dashboards',
          linkPath: '/dashboards',
        }, {
          name: 'Lễ Chính',
        }],
        header: 'Danh sách lễ chính',
        role: 'admin',
        title: 'Lễ Chính | ' + config.site_name,
        show: {
          footer: true,
        },
      },
    }],
  }, {
    /* Giáo phận danh mục */
    path: 'giao-phan/danh-mucs',
    component: {
      render: c => c('router-view'),
    },
    children: [{
      path: '',
      component: GiaoPhanCatesPage,
      name: 'admin.giao.phan.danh.muc.list',
      meta: {
        layout: DefaultLayout,
        auth: true,
        breadcrumbs: [{
          name: 'Quản trị',
          linkName: 'admin.dashboards',
          linkPath: '/dashboards',
        }, {
          name: 'Giáo phận danh mục',
        }],
        header: 'Danh sách danh mục',
        role: 'admin',
        title: 'Danh mục | ' + config.site_name,
        show: {
          footer: true,
        },
      },
    }, {
      path: 'add',
      component: () =>
        import('v@admin/giaophancates/add'),
      name: 'admin.giao.phan.danh.muc.add',
      meta: {
        layout: DefaultLayout,
        auth: true,
        breadcrumbs: [{
          name: 'Quản trị',
          linkName: 'admin.dashboards',
          linkPath: '/dashboards',
        }, {
          name: 'Danh mục tin giáo phận',
          linkName: 'admin.danh.muc.giao.phan.list',
          linkPath: '/giao-phan/danh-mucs',
        }, {
          name: 'Thêm danh mục giáo phận',
        }],
        header: 'Thêm danh mục tin tức giáo phận',
        role: 'admin',
        title: 'Thêm danh mục giáo phận | ' + config.site_name,
        show: {
          footer: true,
        },
      },
    }, {
      path: 'edit/:categoryId',
      component: () =>
        import('v@admin/giaophancates/edit'),
      name: 'admin.danh.muc.giao.phan.edit',
      meta: {
        layout: DefaultLayout,
        auth: true,
        breadcrumbs: [{
          name: 'Quản trị',
          linkName: 'admin.dashboards.list',
          linkPath: '/dashboards',
        }, {
          name: 'Danh mục tin giáo phận',
          linkName: 'admin.danh.muc.giao.phan',
          linkPath: '/giao-phan/danh-mucs',
        }, {
          name: 'Cập nhật danh mục',
        }],
        header: 'DanhMucEdit',
        role: 'admin',
        title: 'Edit category | ' + config.site_name,
        show: {
          footer: true,
        },
      },
    }],
  }, {
    /* Giáo phận tin tuc */
    path: 'giao-phan/tin-tucs',
    component: {
      render: c => c('router-view'),
    },
    children: [{
      path: '',
      component: GiaoPhanInfosPage,
      name: 'admin.giao.phan.tin.tuc.list',
      meta: {
        layout: DefaultLayout,
        auth: true,
        breadcrumbs: [{
          name: 'Quản trị',
          linkName: 'admin.dashboards',
          linkPath: '/dashboards',
        }, {
          name: 'Giáo phận tin tức',
        }],
        header: 'Danh sách tin tức',
        role: 'admin',
        title: 'Tin tức | ' + config.site_name,
        show: {
          footer: true,
        },
      },
    }, {
      path: 'add',
      component: () =>
        import('v@admin/giaophaninfos/add'),
      name: 'admin.giao.phan.tin.tuc.add',
      meta: {
        layout: DefaultLayout,
        auth: true,
        breadcrumbs: [{
          name: 'Quản trị',
          linkName: 'admin.dashboards',
          linkPath: '/dashboards',
        }, {
          name: 'Danh mục tin',
          linkName: 'admin.giao.phan.tin.tuc.list',
          linkPath: '/danh-muc/tin-tucs',
        }, {
          name: 'Thêm tin tức',
        }],
        header: 'Thêm danh mục tin tức',
        role: 'admin',
        title: 'Thêm tin tức | ' + config.site_name,
        show: {
          footer: true,
        },
      },
    }, {
      path: 'edit/:infoId',
      component: () =>
        import('v@admin/giaophaninfos/edit'),
      name: 'admin.giao.phan.tin.tuc.edit',
      meta: {
        layout: DefaultLayout,
        auth: true,
        breadcrumbs: [{
          name: 'Quản trị',
          linkName: 'admin.dashboards.list',
          linkPath: '/dashboards',
        }, {
          name: 'Danh mục tin giáo phận',
          linkName: 'admin.giao.phan.tin.tuc',
          linkPath: '/giao-phan/tin-tucs',
        }, {
          name: 'Cập nhật tin tức',
        }],
        header: 'GiaoPhanTinTucEdit',
        role: 'admin',
        title: 'Chỉnh sửa giáo phận tin tức | ' + config.site_name,
        show: {
          footer: true,
        },
      },
    }],
  }, {
    path: 'restrict-ips',
    component: {
      render: c => c('router-view'),
    },
    children: [{
      path: '',
      component: RestrictIpsPage,
      name: 'admin.restrict_ips',
      meta: {
        layout: DefaultLayout,
        auth: true,
        breadcrumbs: [{
          name: 'Quản trị',
          linkName: 'admin.dashboards',
          linkPath: '/dashboards',
        }, {
          name: 'Restrict Ip',
        }],
        header: 'Danh sách Restrict Ip',
        role: 'admin',
        title: 'Restrict Ip | ' + config.site_name,
        show: {
          footer: true,
        },
      },
    }, {
      path: 'add',
      component: () =>
        import('v@admin/restrictips/add'),
      name: 'admin.restrict_ip.add',
      meta: {
        layout: DefaultLayout,
        auth: true,
        breadcrumbs: [{
          name: 'Quản trị',
          linkName: 'admin.dashboards',
          linkPath: '/dashboards',
        }, {
          name: 'Danh mục IP',
          linkName: 'admin.restrict_ip.list',
          linkPath: '/restrict-ips',
        }, {
          name: 'Thêm IP',
        }],
        header: 'Thêm IP',
        role: 'admin',
        title: 'Thêm IP | ' + config.site_name,
        show: {
          footer: true,
        },
      },
    }, {
      path: 'edit/:infoId',
      component: () => import('v@admin/restrictips/edit'),
      name: 'admin.restrict_ip.edit',
      meta: {
        layout: DefaultLayout,
        auth: true,
        breadcrumbs: [{
          name: 'Quản trị',
          linkName: 'admin.dashboards',
          linkPath: '/dashboards',
        }, {
          name: 'Danh sách IP',
          linkName: 'admin.restrict_ip.list',
          linkPath: '/restrict-ips',
        }, {
          name: 'Restrict Ip',
        }],
        header: 'Sửa restrict ip',
        role: 'admin',
        title: 'Restrict IP | ' + config.site_name,
        show: {
          footer: true,
        },
      },
    }],
  }, {
    path: 'albums',
    component: {
      render: c => c('router-view'),
    },
    children: [{
      path: '',
      component: AlbumsPage,
      name: 'admin.albums',
      meta: {
        layout: DefaultLayout,
        auth: true,
        breadcrumbs: [{
          name: 'Quản trị',
          linkName: 'admin.dashboards',
          linkPath: '/dashboards',
        }, {
          name: 'Albums',
        }],
        header: 'Danh sách Albums',
        role: 'admin',
        title: 'Albums | ' + config.site_name,
        show: {
          footer: true,
        },
      },
    }, {
      path: 'add',
      component: () =>
        import('v@admin/albums/add'),
      name: 'admin.albums.add',
      meta: {
        layout: DefaultLayout,
        auth: true,
        breadcrumbs: [{
          name: 'Quản trị',
          linkName: 'admin.dashboards',
          linkPath: '/dashboards',
        }, {
          name: 'Danh mục Albums',
          linkName: 'admin.Albums.list',
          linkPath: '/albums',
        }, {
          name: 'Thêm Albums',
        }],
        header: 'Thêm Albums',
        role: 'admin',
        title: 'Thêm Albums | ' + config.site_name,
        show: {
          footer: true,
        },
      },
    }, {
      path: 'edit/:infoId',
      component: () => import('v@admin/albums/edit'),
      name: 'admin.albums.edit',
      meta: {
        layout: DefaultLayout,
        auth: true,
        breadcrumbs: [{
          name: 'Quản trị',
          linkName: 'admin.dashboards',
          linkPath: '/dashboards',
        }, {
          name: 'Danh sách Albums',
          linkName: 'admin.albums.list',
          linkPath: '/albums',
        }, {
          name: 'Sửa Albums',
        }],
        header: 'Sửa Albums',
        role: 'admin',
        title: 'Sửa Albums | ' + config.site_name,
        show: {
          footer: true,
        },
      },
    }],
  }, {
    path: 'group-albums',
    component: {
      render: c => c('router-view'),
    },
    children: [{
      path: '',
      component: GroupAlbumsPage,
      name: 'admin.group.albums',
      meta: {
        layout: DefaultLayout,
        auth: true,
        breadcrumbs: [{
          name: 'Quản trị',
          linkName: 'admin.dashboards',
          linkPath: '/dashboards',
        }, {
          name: 'Group Albums',
        }],
        header: 'Danh sách Group albums',
        role: 'admin',
        title: 'Group albums | ' + config.site_name,
        show: {
          footer: true,
        },
      },
    }, {
      path: 'add',
      component: () =>
        import('v@admin/groupalbums/add'),
      name: 'admin.group.albums.add',
      meta: {
        layout: DefaultLayout,
        auth: true,
        breadcrumbs: [{
          name: 'Quản trị',
          linkName: 'admin.dashboards',
          linkPath: '/dashboards',
        }, {
          name: 'Danh mục Group albums',
          linkName: 'admin.group.albums.list',
          linkPath: '/group-albums',
        }, {
          name: 'Thêm Group albums',
        }],
        header: 'Thêm Group albums',
        role: 'admin',
        title: 'Thêm Group albums | ' + config.site_name,
        show: {
          footer: true,
        },
      },
    }, {
      path: 'edit/:infoId',
      component: () => import('v@admin/groupalbums/edit'),
      name: 'admin.group.albums.edit',
      meta: {
        layout: DefaultLayout,
        auth: true,
        breadcrumbs: [{
          name: 'Quản trị',
          linkName: 'admin.dashboards',
          linkPath: '/dashboards',
        }, {
          name: 'Danh sách group albums',
          linkName: 'admin.group.albums.list',
          linkPath: '/group-albums',
        }, {
          name: 'Group albums',
        }],
        header: 'Sửa Group albums',
        role: 'admin',
        title: 'Group albums | ' + config.site_name,
        show: {
          footer: true,
        },
      },
    }],
  }, {
    path: 'ngay-les',
    component: {
      render: c => c('router-view')
    },
    children: [{
      path: '',
      component: NgayLePage,
      name: 'admin.ngay.le.list',
      meta: {
        layout: DefaultLayout,
        auth: true,
        breadcrumbs: [{ 
          name: 'Quản trị',
          linkName: 'admin.dashboards',
          linkPath: '/dashboards'
        }, {
          name: 'Ngày Lễ'
        }],
        header: 'Danh sách Ngày lễ',
        role: 'admin',
        title: 'Ngày Lễ | ' + config.site_name,
        show: {
          footer: true
        }
      }
    },]
  },
  {
    path: 'lich-cong-giao',
    component: {
      render: c => c('router-view')
    },
    children: [{
      path: '',
      component: LichCongGiaoPage,
      name: 'admin.lichconggiao.list',
      meta: {
        layout: DefaultLayout,
        auth: true,
        breadcrumbs: [{ 
          name: 'Quản trị',
          linkName: 'admin.dashboards',
          linkPath: '/dashboards'
        }, {
          name: 'Lịch công giáo'
        }],
        header: 'Lịch công giáo',
        role: 'admin',
        title: 'Lịch công giáo',
        show: {
          footer: true
        }
      }
    },]
  },
],
}]
