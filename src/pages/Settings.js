import React, { Component } from 'react';
import { connect } from 'react-redux';
import { customizedApi } from '../redux/actions/playerActions';
import Loading from '../components/Loading';
import '../styles/settings.css';
import triviaImage from '../styles/img/logo trivia.png';

class Settings extends Component {
  state = {
    category: [],
    amount: '',
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
            : (
              <div>
                <img
                  src={ triviaImage }
                  alt="Trivia Logo"
                  className="trivia__image__settings"
                />
                <div className="settings__box">
                  <div className="settings__container">
                    <h1
                      data-testid="settings-title"
                      className="settings__title"
                    >
                      SETTINGS
                    </h1>
                    <input
                      type="number"
                      onChange={ handleQuestion }
                      name="amount"
                      value={ amount }
                      placeholder="Number of questions"
                    />
                    {triviaCategories
              && (
                <select
                  value={ selectedCategory }
                  onChange={ handleQuestion }
                  name="selectedCategory"
                  required
                >
                  <option
                    className="select__placeholder"
                    value=""
                    disabled
                    hidden
                  >
                    Category
                  </option>
                  <option value="">
                    Any
                  </option>
                  {triviaCategories.map((category) => (
                    <option
                      key={ category.id }
                      value={ category.id }
                    >
                      {category.name}

                    </option>
                  ))}
                </select>
              )}

                    <select
                      name="selectedDifficulty"
                      value={ selectedDifficulty }
                      onChange={ handleQuestion }
                      required
                    >
                      <option
                        className="select__placeholder"
                        value=""
                        hidden
                        disabled
                        selected
                      >
                        Difficulty
                      </option>
                      <option value="">
                        Any
                      </option>
                      <option value="easy">
                        Easy
                      </option>
                      <option value="medium">
                        Medium
                      </option>
                      <option value="hard">
                        Hard
                      </option>
                    </select>

                    <select
                      name="selectedType"
                      value={ selectedType }
                      onChange={ handleQuestion }
                      required
                    >
                      <option
                        className="select__placeholder"
                        value=""
                        hidden
                        disabled
                        selected
                      >
                        Type
                      </option>
                      <option value="">
                        Any
                      </option>
                      <option value="multiple">
                        Multiple Choice
                      </option>
                      <option value="boolean">
                        True / False
                      </option>
                    </select>
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
                      disabled={ amount <= 0 }
                    >
                      SAVE
                    </button>
                  </div>
                </div>
              </div>
            )
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
