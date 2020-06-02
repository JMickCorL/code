export default [
  {
    path: '/admin/account',
    component: () => import('../Layout/index.vue'),
    meta: {
      title: 'Paciente',
      icon: 'icon-1',
      noCache: true,
      roles: [
        'ADMIN',
        'FD',
        'OPTO',
        'MD',
        'TS',
      ],
    },
    hidden: true,
    children: [
      {
        path: '',
        name: 'account',
        component: () => import('../views/Account.vue'),
        meta: {
          title: 'Cuenta',
          roles: [
            'ADMIN',
            'FD',
            'OPTO',
            'MD',
            'TS',
          ],
        },
      },
      {
        path: 'password',
        name: 'change password',
        component: () => import('../views/Password.vue'),
        meta: {
          title: 'Cambiar Contraseña',
          roles: [
            'ADMIN',
            'FD',
            'OPTO',
            'MD',
            'TS',
          ],
        },
      },
    ],
  },
  {
    path: '/admin/patient',
    name: 'patient',
    component: () => import('../Layout/index.vue'),
    meta: {
      title: 'Paciente',
      icon: 'icon-1',
      noCache: true,
      roles: [
        'ADMIN',
        'FD',
        'OPTO',
        'MD',
        'TS',
      ],
    },
    redirect: '/admin/patient/list',
    children: [
      {
        path: 'list',
        name: 'list',
        component: () => import('../views/patient/List.vue'),
        meta: {
          title: 'Lista',
          icon: 'icon',
          noCache: true,
          roles: [
            'ADMIN',
            'FD',
            'OPTO',
            'MD',
            'TS',
          ],
        },
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('../views/patient/Register.vue'),
        meta: {
          title: 'Registro',
          icon: 'icon',
          noCache: true,
          roles: [
            'ADMIN',
            'FD',
            'TS',
          ],
        },
      },
      {
        path: 'full-profile/:id',
        name: 'full-profile',
        component: () => import('../views/patient/FullProfile.vue'),
        meta: {
          title: 'Perfil Completo',
          icon: 'icon',
          noCache: true,
          roles: [
            'ADMIN',
            'FD',
            'OPTO',
            'MD',
            'TS',
          ],
        },
      },
      {
        path: 'general-profile/:id',
        name: 'general-profile',
        component: () => import('../views/profiles/General/index.vue'),
        meta: {
          title: 'Perfil General',
          icon: 'icon',
          noCache: true,
          roles: [
            'ADMIN',
            'FD',
            'TS',
          ],
        },
      },
    ],
  },
  {
    path: '/admin/appointments',
    component: () => import('../Layout/index.vue'),
    meta: {
      title: 'Reuniones',
      name: 'appointments',
      icon: 'icon-2',
      roles: [
        'ADMIN',
        'FD',
        'OPTO',
        'MD',
        'TS',
      ],
    },
    hiddenOnRole: [],
    children: [
      {
        path: '',
        name: 'appointments',
        component: () => import('../views/appointments/index.vue'),
        meta: {
          title: 'Lista',
          icon: 'icon',
          noCache: true,
          roles: [
            'ADMIN',
            'OPTO',
            'MD',
            'TS',
            'FD',
          ],
        },
      },
      {
        path: 'subsequent/:id',
        name: 'subsequent',
        hidden: true,
        component: () => import('../views/appointments/Subsequent.vue'),
        meta: {
          title: 'Cita Subsecuente',
          icon: 'icon',
          noCache: true,
          roles: [
            'ADMIN',
            'FD',
            'MD',
            'TS',
          ],
        },
      },
      {
        path: 'social/:id',
        name: 'social',
        component: () => import('../views/appointments/Social.vue'),
        hidden: true,
        meta: {
          title: 'Evaluación social',
          icon: 'icon',
          noCache: true,
          roles: [
            'ADMIN',
            'FD',
            'TS',
          ],
        },
      },
    ],
  },
  {
    path: '/admin/evaluations',
    name: 'evaluations',
    hidden: true,
    component: () => import('../Layout/index.vue'),
    meta: {
      title: 'Evaluaciones',
      name: 'evaluations',
      // icon: 'icon-1',
      roles: [
        'ADMIN',
        'OPTO',
        'MD',
        'TS',
      ],
    },
    children: [
      {
        path: 'ofta/:id',
        name: 'OPHT',
        component: () => import('../views/evaluations/Ofta/index.vue'),
        meta: {
          title: 'Evaluación oftalmológica',
          icon: 'icon',
          noCache: true,
          roles: ['ADMIN', 'MD'],
        },
      },
      {
        path: 'opto/:id',
        name: 'opto',
        component: () => import('../views/evaluations/Opto/index.vue'),
        meta: {
          title: 'Evaluación optométrica',
          icon: 'icon',
          noCache: true,
          roles: ['ADMIN', 'OPTO'],
        },
      },
      {
        path: 'socialeva/:id',
        name: 'social evaluation',
        component: () => import('../views/evaluations/SocioEconomic/index.vue'),
        meta: {
          title: 'Evaluación social',
          icon: 'icon',
          noCache: true,
          roles: ['ADMIN', 'TS'],
        },
      },
    ],
  },
];
