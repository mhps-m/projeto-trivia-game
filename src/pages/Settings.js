import React, { Component } from 'react';
import { connect } from 'react-redux';
import { customizedApi } from '../redux/actions/playerActions';
import Loading from '../components/Loading';

class Settings extends Component {
  state = {
    category: [],
    amount: 5,
    selectedCategory: '',
    selectedType: '',
    selectedDifficulty: '',

  };

  componentDidMount() {
    const { fetchCategory } = this;
    fetchCategory();
  }

  handleQuestion = ({ target: { name, value } }) => this.setState({ [name]: value });

  fetchCategory = async () => {
    const request = await fetch('https://opentdb.com/api_category.php');
    const response = await request.json();
    this.setState({ category: response });
  };

  render() {
    const { state: { category: { trivia_categories: triviaCategories,
    }, selectedCategory, selectedType, selectedDifficulty, amount },
    props: { dispatch, history },
    handleQuestion,
    } = this;
    return (
      <div>
        {
          !triviaCategories
            ? <Loading />
            : <div>
              <h1 data-testid="settings-title">
                Settings:
              </h1>
              <label htmlFor="amount">
                Number of questions:
                <input
                  type="text"
                  onChange={ handleQuestion }
                  name="amount"
                  value={ amount }
                />
              </label>
              {triviaCategories
        && (

          <label htmlFor="selectedCategory">
            Category:
            <select
              value={ selectedCategory }
              onChange={ handleQuestion }
              name="selectedCategory"
            >
              {triviaCategories.map((category) => (
                <option key={ category.id } value={ category.id }>{category.name}</option>
              ))}
            </select>
          </label>
        )}

              <label htmlFor="selectedDifficulty">
                Difficulty:
                <select
                  name="selectedDifficulty"
                  value={ selectedDifficulty }
                  onChange={ handleQuestion }
                >
                  <option value="easy">
                    easy
                  </option>
                  <option value="medium">
                    medium
                  </option>
                  <option value="hard">
                    hard
                  </option>
                </select>
              </label>
              <label htmlFor="selectedType">
                Type:
                <select
                  name="selectedType"
                  value={ selectedType }
                  onChange={ handleQuestion }
                >
                  <option value="any">
                    any Type
                  </option>
                  <option value="multiple">
                    Multiple Choise
                  </option>
                  <option value="boolean">
                    True / False
                  </option>
                </select>
              </label>
              <button
                type="button"
                onClick={ () => {
                  dispatch(customizedApi(
                    amount,
                    selectedCategory,

                    selectedDifficulty,

                    selectedType,
                  ));
                  history.push('/');
                } }
              >
                Save
              </button>
              </div>
        }
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  ...store.player,
});

Settings.propTypes = {}.isRequired;

export default connect(mapStateToProps)(Settings);
