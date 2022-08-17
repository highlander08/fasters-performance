import { connectProps } from '@devexpress/dx-react-core';
import {
  GroupingState,
  IntegratedGrouping,
  ViewState,
} from '@devexpress/dx-react-scheduler';
import {
  AppointmentForm,
  Appointments,
  AppointmentTooltip,
  DateNavigator,
  DayView,
  GroupingPanel,
  Resources,
  Scheduler,
  Toolbar,
  ViewSwitcher,
  WeekView,
} from '@devexpress/dx-react-scheduler-material-ui';
import { alpha, styled } from '@mui/material/styles';
import React, { useContext } from 'react';

import AccessTime from '@mui/icons-material/AccessTime';
import Event from '@mui/icons-material/Event';
import Lens from '@mui/icons-material/Lens';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import classNames from 'clsx';

import { data as tasks } from '../demo-data/grouping';
import { priorities } from '../demo-data/tasks';
import { MyContext } from '../hooks/useContext';

const grouping = [
  {
    resourceName: 'priorityId',
  },
];

const filterTasks = (items, priorityId) =>
  items.filter((task) => !priorityId || task.priorityId === priorityId);

const getIconById = (id) => {};

const PREFIX = 'Demo';
const classes = {
  flexibleSpace: `${PREFIX}-flexibleSpace`,
  prioritySelector: `${PREFIX}-prioritySelector`,
  content: `${PREFIX}-content`,
  contentContainer: `${PREFIX}-contentContainer`,
  text: `${PREFIX}-text`,
  title: `${PREFIX}-title`,
  icon: `${PREFIX}-icon`,
  contentItemIcon: `${PREFIX}-contentItemIcon`,
  grayIcon: `${PREFIX}-grayIcon`,
  colorfulContent: `${PREFIX}-colorfulContent`,
  lens: `${PREFIX}-lens`,
  textCenter: `${PREFIX}-textCenter`,
  dateAndTitle: `${PREFIX}-dateAndTitle`,
  titleContainer: `${PREFIX}-titleContainer`,
  container: `${PREFIX}-container`,
  bullet: `${PREFIX}-bullet`,
  prioritySelectorItem: `${PREFIX}-prioritySelectorItem`,
  priorityText: `${PREFIX}-priorityText`,
  priorityShortText: `${PREFIX}-priorityShortText`,

  cellHighPriority: `${PREFIX}-cellHighPriority`,

  headerCellHighPriority: `${PREFIX}-headerCellHighPriority`,
};
const stylesByPriority = priorities.reduce(
  (acc, priority) => ({
    ...acc,
    [`cell${priority.text.replace(' ', '')}`]: {
      backgroundColor: alpha(priority.color[400], 0.1),
      '&:hover': {
        backgroundColor: alpha(priority.color[400], 0.15),
      },
      '&:focus': {
        backgroundColor: alpha(priority.color[400], 0.2),
      },
    },
    [`headerCell${priority.text.replace(' ', '')}`]: {
      backgroundColor: alpha(priority.color[400], 0.1),
      '&:hover': {
        backgroundColor: alpha(priority.color[400], 0.1),
      },
      '&:focus': {
        backgroundColor: alpha(priority.color[400], 0.1),
      },
    },
  }),
  {},
);
const groupingStyles = ({ theme }) => ({
  [`&.${classes.cellLowPriority}`]: stylesByPriority.cellLowPriority,
  [`&.${classes.cellHighPriority}`]: stylesByPriority.cellHighPriority,
  [`&.${classes.headerCellHighPriority}`]:
    stylesByPriority.headerCellHighPriority,
  [`& .${classes.icon}`]: {
    paddingLeft: theme.spacing(1),
    verticalAlign: 'middle',
  },
});

const StyledToolbarFlexibleSpace = styled(Toolbar.FlexibleSpace)(() => ({
  [`&.${classes.flexibleSpace}`]: {
    margin: '0 auto 0 0',
  },
}));

const StyledFormControl = styled(FormControl)(({ theme: { spacing } }) => ({
  [`&.${classes.prioritySelector}`]: {
    minWidth: 140,
    marginLeft: spacing(2),
    '@media (max-width: 500px)': {
      minWidth: 0,
      fontSize: '0.75rem',
      marginLeft: spacing(0.5),
    },
  },
}));

const StyledPrioritySelectorItem = styled('div')(
  ({ theme: { palette, spacing }, color }) => ({
    [`& .${classes.bullet}`]: {
      backgroundColor: color ? color[400] : palette.divider,
      borderRadius: '50%',
      width: spacing(2),
      height: spacing(2),
      marginRight: spacing(2),
      display: 'inline-block',
    },
    [`&.${classes.prioritySelectorItem}`]: {
      display: 'flex',
      alignItems: 'center',
    },
    [`& .${classes.priorityText}`]: {
      '@media (max-width: 500px)': {
        display: 'none',
      },
    },
    [`& .${classes.priorityShortText}`]: {
      '@media (min-width: 500px)': {
        display: 'none',
      },
    },
  }),
);
const StyledWeekViewTimeTableCell = styled(WeekView.TimeTableCell)(
  groupingStyles,
);
const StyledTooltipContent = styled('div')(
  ({ theme: { spacing, typography, palette }, color }) => ({
    [`&.${classes.content}`]: {
      padding: spacing(3, 1),
      paddingTop: 0,
      backgroundColor: palette.background.paper,
      boxSizing: 'border-box',
      width: '400px',
    },
    [`& .${classes.contentContainer}`]: {
      paddingBottom: spacing(1.5),
    },
    [`& .${classes.text}`]: {
      ...typography.body2,
      display: 'inline-block',
    },
    [`& .${classes.title}`]: {
      ...typography.h6,
      color: palette.text.secondary,
      fontWeight: typography.fontWeightBold,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'normal',
    },
    [`& .${classes.icon}`]: {
      verticalAlign: 'middle',
    },
    [`& .${classes.contentItemIcon}`]: {
      textAlign: 'center',
    },
    [`& .${classes.grayIcon}`]: {
      color: palette.action.active,
    },
    [`& .${classes.colorfulContent}`]: {
      color: color[300],
    },
    [`& .${classes.lens}`]: {
      width: spacing(4.5),
      height: spacing(4.5),
      verticalAlign: 'super',
    },
    [`& .${classes.textCenter}`]: {
      textAlign: 'center',
    },
    [`& .${classes.dateAndTitle}`]: {
      lineHeight: 1.1,
    },
    [`& .${classes.titleContainer}`]: {
      paddingBottom: spacing(2),
    },
    [`& .${classes.container}`]: {
      paddingBottom: spacing(1.5),
    },
  }),
);

const StyledWeekViewDayScaleCell = styled(WeekView.DayScaleCell)(
  groupingStyles,
);

const StyledDayViewTimeTableCell = styled(DayView.TimeTableCell)(
  groupingStyles,
);

const DayViewTimeTableCell = ({ groupingInfo, ...restProps }) => {
  const groupId = groupingInfo[0].id;
  return (
    <StyledDayViewTimeTableCell
      className={classNames({
        [classes.cellLowPriority]: groupId === 1,
        [classes.cellHighPriority]: groupId === 3,
      })}
      groupingInfo={groupingInfo}
      {...restProps}
    />
  );
};
const DayViewDayScaleCell = ({ groupingInfo, ...restProps }) => {
  const groupId = groupingInfo[0].id;
};
const WeekViewTimeTableCell = ({ groupingInfo, ...restProps }) => {
  const groupId = groupingInfo[0].id;
  return (
    <StyledWeekViewTimeTableCell
      className={classNames({
        [classes.cellLowPriority]: groupId === 1,
        [classes.cellHighPriority]: groupId === 3,
      })}
      groupingInfo={groupingInfo}
      {...restProps}
    />
  );
};
const WeekViewDayScaleCell = ({ groupingInfo, ...restProps }) => {
  const groupId = groupingInfo[0].id;
  return (
    <StyledWeekViewDayScaleCell
      className={classNames({
        [classes.headerCellLowPriority]: groupId === 1,
        [classes.headerCellHighPriority]: groupId === 3,
      })}
      groupingInfo={groupingInfo}
      {...restProps}
    />
  );
};

const GroupingPanelCell = ({ group, ...restProps }) => {
  const groupId = group.id;
  const Icon = getIconById(groupId);
};

const PrioritySelectorItem = ({ color, text: resourceTitle }) => {
  const text = resourceTitle || 'Todas as Agendas';
  const shortText = resourceTitle ? text.substring(0, 1) : 'All';

  return (
    <StyledPrioritySelectorItem
      className={classes.prioritySelectorItem}
      color={color}
    >
      <span className={classes.bullet} />
      <span className={classes.priorityText}>{text}</span>
    </StyledPrioritySelectorItem>
  );
};

const PrioritySelector = ({ priorityChange, priority }) => {
  const currentPriority = priority > 0 ? priorities[priority - 1] : {};
  return (
    <StyledFormControl className={classes.prioritySelector} variant="standard">
      <Select
        disableUnderline
        value={priority}
        onChange={(e) => {
          priorityChange(e.target.value);
        }}
      >
        <MenuItem value={0}>
          <PrioritySelectorItem />
        </MenuItem>
        {priorities.map(({ id, color, text }) => (
          <MenuItem value={id} key={id.toString()}>
            <PrioritySelectorItem color={color} text={text} />
          </MenuItem>
        ))}
      </Select>
    </StyledFormControl>
  );
};

const FlexibleSpace = ({ priority, priorityChange, ...restProps }) => (
  <StyledToolbarFlexibleSpace {...restProps} className={classes.flexibleSpace}>
    <PrioritySelector priority={priority} priorityChange={priorityChange} />
  </StyledToolbarFlexibleSpace>
);
const TooltipContent = ({
  appointmentData,
  formatDate,
  appointmentResources,
}) => {
  const resource = appointmentResources[0];
  if (appointmentData.priorityId === 2) {
    icon = <Event className={classes.icon} />;
  }

  return (
    <StyledTooltipContent className={classes.content} color={resource.color}>
      <Grid
        container
        alignItems="flex-start"
        className={classes.titleContainer}
      >
        <Grid item xs={10}>
          <div></div>
        </Grid>
      </Grid>
      <Grid container alignItems="center" className={classes.contentContainer}>
        <Grid item xs={2} className={classes.textCenter}>
          <AccessTime className={classes.icon} />
        </Grid>
      </Grid>
      <Grid
        container
        alignItems="center"
        key={`${resource.fieldName}_${resource.id}`}
      >
        <Grid
          className={classNames(
            classes.contentItemIcon,
            classes.icon,
            classes.colorfulContent,
          )}
          item
          xs={2}
        >
          {icon}
        </Grid>
        <Grid item xs={10}>
          <span className={classNames(classes.text, classes.colorfulContent)}>
            {resource.text}
          </span>
        </Grid>
      </Grid>
    </StyledTooltipContent>
  );
};

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentDate: '2018-05-28',
      currentViewName: 'Day',
      data: tasks,
      currentPriority: 0,
      resources: [
        {
          fieldName: 'priorityId',
          title: 'Priority',
          instances: priorities,
        },
      ],
    };
    this.currentViewNameChange = (currentViewName) => {
      this.setState({ currentViewName });
    };
    this.currentDateChange = (currentDate) => {
      this.setState({ currentDate });
    };
    this.priorityChange = (value) => {
      const { resources } = this.state;
      const nextResources = [
        {
          ...resources[0],
          instances: value > 0 ? [priorities[value - 1]] : priorities,
        },
      ];

      this.setState({ currentPriority: value, resources: nextResources });
    };
    this.flexibleSpace = connectProps(FlexibleSpace, () => {
      const { currentPriority } = this.state;
      return {
        priority: currentPriority,
        priorityChange: this.priorityChange,
      };
    });
  }

  componentDidUpdate() {
    this.flexibleSpace.update();
  }

  render() {
    const { data, currentDate, currentViewName, currentPriority, resources } =
      this.state;

    return (
      <Paper>
        <Scheduler data={filterTasks(data, currentPriority)} height={660}>
          <ViewState
            currentDate={currentDate}
            currentViewName={currentViewName}
            onCurrentViewNameChange={this.currentViewNameChange}
            onCurrentDateChange={this.currentDateChange}
          />
          <GroupingState grouping={grouping} />

          <DayView
            startDayHour={9}
            endDayHour={19}
            timeTableCellComponent={DayViewTimeTableCell}
            dayScaleCellComponent={DayViewDayScaleCell}
            intervalCount={2}
          />

          <Appointments />
          <Resources data={resources} />
          <IntegratedGrouping />

          <Toolbar flexibleSpaceComponent={this.flexibleSpace} />
          <DateNavigator />
          <ViewSwitcher />
        </Scheduler>
      </Paper>
    );
  }
}
