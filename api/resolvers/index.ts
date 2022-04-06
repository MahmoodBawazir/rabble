import { merge } from 'lodash'

import * as customScalars from '../entities/scalars'
import userMutations from './mutations/user'
import userQueries from './queries'

const resolvers = merge({}, customScalars.resolvers, userQueries, userMutations)

export default resolvers
